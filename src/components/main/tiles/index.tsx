// React imports
import { useState, useEffect } from 'react';

// Context imports
import { useMapbox } from '../../context/mapbox';

// Third-party imports
import { Source, Layer, LayerProps } from 'react-map-gl';
import proj4 from 'proj4';

const wgs84 = 'EPSG:4326';
const webMercator = 'EPSG:3857';

export const Tiles = () => {
    const { mapRef } = useMapbox();
    const [ currentBounds, setCurrentBounds ] = useState<any>(null);
    const [ geojsonData, setGeojsonData ] = useState(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current.getMap();

        map.once('idle', () => {
            const bounds = map.getBounds();

            if (bounds) {
                const sw = bounds.getSouthWest();
                const ne = bounds.getNorthEast();

                if (sw && ne) {
                    if (isFinite(sw.lng) && isFinite(sw.lat) && isFinite(ne.lng) && isFinite(ne.lat)) {
                        const swMercator = proj4(wgs84, webMercator, [sw.lng, sw.lat]);
                        const neMercator = proj4(wgs84, webMercator, [ne.lng, ne.lat]);

                        const geometry = {
                            xmin: swMercator[0],
                            ymin: swMercator[1],
                            xmax: neMercator[0],
                            ymax: neMercator[1],
                            spatialReference: {
                                wkid: 102100,
                            },
                        };

                        const mapBounds = JSON.stringify(geometry);
                        setCurrentBounds(mapBounds);
                    }
                }
            }
        });
    }, [mapRef]);

    useEffect(() => {
        if (!currentBounds) return;

        const fetchData = async () => {
            const url = `
                https://geo.blumenau.sc.gov.br/server/rest/services/consulta_construir/Lotes_info/FeatureServer/0/query
                ?f=json
                &returnGeometry=true
                &spatialRel=esriSpatialRelIntersects
                &geometry=${currentBounds}
                &geometryType=esriGeometryEnvelope
                &inSR=102100
                &outFields=*
                &outSR=102100
                &resultType=tile
            `.replace(/\s/g, '');

            try {
                const response = await fetch(url);
                const data = await response.json();
                setGeojsonData(data); // Assuming the data returned is in ESRI JSON format
            } catch (error) {
                console.error('Error fetching GeoJSON data:', error);
            }
        };

        fetchData();
    }, [currentBounds]);

    const parcelLayer: LayerProps = {
        id: 'blumenau-layer',
        source: 'blumenau-geojson',
        type: 'fill',
        paint: {
            'fill-color': 'red',
            'fill-opacity': 1, 
        },
    };

    const esriToGeoJSON = (esriData: any) => {
        return {
            type: "FeatureCollection",
            crs: {
                type: "name",
                properties: {
                    name: "EPSG:4326"
                }
            },
            features: esriData.features.map((feature: any) => ({
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: feature.geometry.rings.map((ring: any) =>
                        ring.map((coord: any) => proj4(webMercator, wgs84, coord))
                    )
                },
                properties: feature.attributes
            }))
        };
    }

    const transformedEsri: any = geojsonData && esriToGeoJSON(geojsonData);

    return (
        transformedEsri && (
            <Source id="blumenau-geojson" type="geojson" data={transformedEsri}>
                <Layer {...parcelLayer} />
            </Source>
        )
    );
};

Tiles.displayName = 'Tiles';

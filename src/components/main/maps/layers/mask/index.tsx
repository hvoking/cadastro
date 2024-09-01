// App context
import './styles.scss';

// Context imports
import { useMask } from '../../../../context/mask';

// Third-party imports
import { Source, Layer } from 'react-map-gl';
import * as d3 from 'd3';

export const Mask = () => {
	const { maskProperties } = useMask();

	if (!maskProperties) return <></>;

	// Filter by fill color
	const features = maskProperties.filter((item: any) => {
        const stringList = Object.keys(item.layer.paint);
        return stringList.includes("fill-color");
    });

	const updatedFeatures = features.map((item: any) => {
		return {
			type: "Feature",
			geometry: item.geometry,
			properties: {
				...item.properties
			}
		};
	});
		
	const geoJsonData: any = {
        "type": "FeatureCollection",
        "features": updatedFeatures
    };

	// Function to download geoJsonData as a file
	const downloadGeoJson = () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geoJsonData));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "data.geojson");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	};
	return (
		<>
			<button className="download-button" onClick={downloadGeoJson}>Download GeoJSON</button>
			<Source id="polygon-data" type="geojson" data={geoJsonData}>
		        <Layer
		          id="extruded-polygons"
		          type="fill-extrusion"
		          paint={{
		            'fill-extrusion-color': "rgba(222, 222, 122, 1)",
		            'fill-extrusion-height': 12,
		            'fill-extrusion-base': 0,
		            'fill-extrusion-opacity': 1
		          }}
		        />
		    </Source>
		</>
	);
};

Mask.displayName = "Mask";

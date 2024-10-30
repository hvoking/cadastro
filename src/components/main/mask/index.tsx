// App context
import { Download } from './download';
import './styles.scss';

// Context imports
import { useMask } from '../../context/mask';

// Third-party imports
import { Source, Layer } from 'react-map-gl';

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
	
	return (
		<>
			<Download data={geoJsonData}/>		
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

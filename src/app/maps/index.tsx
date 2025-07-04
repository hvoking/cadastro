// App imports
import { Tiles } from './tiles';
import { Lines } from './lines';

// Context imports
import { useGeo } from 'context/geo';

// Third-party imports
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map } from 'react-map-gl/mapbox';

export const Maps = () => {
	const { viewport, mapRef, mapStyle } = useGeo();
	
	return (
		<Map
			ref={mapRef}
			initialViewState={viewport}
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
			mapStyle={mapStyle}
		>	
			{/*<Lines/>*/}
			<Tiles/>
		</Map>
	)
}

Maps.displayName="Maps";
// App imports
import { Circle } from './circle';
import { Mask } from './mask';
import { Tiles } from './tiles';
import { Lines } from './lines';
import './styles.scss';

// Context imports
import { useMapbox } from '../context/mapbox';
import { useEvents } from '../context/events';

// Third-party imports
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map } from 'react-map-gl';

export const Main = () => {
	const { viewport, mapRef } = useMapbox();
    const { isDragging, onDragStart, onMouseMove, onDragEnd } = useEvents();

    const mapStyle = "mapbox://styles/hvoking/clygh6abe01fv01qrd3y0105g";

	return (
		<div className="map-container">
			<Map
				ref={mapRef}
				initialViewState={viewport}
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
				mapStyle={mapStyle}
				onMouseDown={onDragStart}
                onMouseMove={onMouseMove}
                onMouseUp={onDragEnd}
                onTouchStart={onDragStart}
                onTouchMove={onMouseMove}
                onTouchEnd={onDragEnd}
                dragPan={!isDragging}
			>	
				<Circle/>
				<Mask/>
				{/*<Lines/>*/}
				<Tiles/>
			</Map>
		</div>
	)
}

Main.displayName="Main";
// React imports
import { useState, useEffect, useRef, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const MapboxContext: React.Context<any> = createContext(null);

export const useMapbox = () => {
	return (
		useContext(MapboxContext)
	)
}

export const MapboxProvider = ({children}: any) => {
	const mapRef = useRef<any>();
	const [ viewport, setViewport ] = useState(Locations.blumenau);

	useEffect(() => {
		mapRef.current?.flyTo({
			center: [viewport.longitude, viewport.latitude],
			zoom: viewport.zoom,
			pitch: viewport.pitch,
			bearing: viewport.bearing,
			duration: 4000, 
			essential: true,
		});
	}, [ viewport ]);
	
	return (
		<MapboxContext.Provider value={{
			mapRef, Locations, 
			viewport, setViewport, 
		}}>
			{children}
		</MapboxContext.Provider>
	)
}

MapboxContext.displayName = "MapboxContext";
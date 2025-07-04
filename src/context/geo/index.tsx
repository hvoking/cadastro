// React imports
import { useState, useEffect, useRef, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null);

export const useGeo = () => {
	return (
		useContext(GeoContext)
	)
}

export const GeoProvider = ({children}: any) => {
	const mapRef = useRef<any>();
	
	const [ viewport, setViewport ] = useState(Locations.blumenau);
	const [ mapStyle, setMapStyle ] = useState("mapbox://styles/hvoking/cm6k7wwbu00cw01ryeqdb9fik");

	const { longitude, latitude, zoom, pitch, bearing } = viewport;

	useEffect(() => {
		mapRef.current?.flyTo({
			center: [longitude, latitude],
			zoom: zoom,
			pitch: pitch,
			bearing: bearing,
			duration: 4000, 
			essential: true,
		});
	}, [ viewport ]);
	
	return (
		<GeoContext.Provider value={{
			mapRef, Locations, 
			viewport, setViewport, 
			mapStyle
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";
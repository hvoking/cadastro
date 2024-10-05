// React imports
import { useState, useContext, createContext } from 'react';

// Context imports
import { useMapbox } from '../mapbox';

const CircleContext: React.Context<any> = createContext(null);

export const useCircle = () => {
	return (
		useContext(CircleContext)
	)
}

export const CircleProvider = ({children}: any) => {
	const { viewport } = useMapbox();
	const [ radius, setRadius ] = useState(1);

	const createCircle = (center: any, radiusInKm: any, points: any) => {
	    if(!points) points = 64;

	    const coords = { latitude: viewport.latitude, longitude: viewport.longitude };
	    const km = radiusInKm;
	    
	    const distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
	    const distanceY = km/110.574;

	    let theta, x, y;
	    const ret = [];

	    for(let i=0; i<points; i++) {
	        theta = (i/points)*(2*Math.PI);
	        x = distanceX*Math.cos(theta);
	        y = distanceY*Math.sin(theta);

	        ret.push([coords.longitude+x, coords.latitude+y]);
	    }
	    ret.push(ret[0]);

	    return {
	        "type": "Polygon",
	        "coordinates": [ret]
	    };
	};

	const circleGeometry: any = createCircle([viewport.longitude, viewport.latitude], radius, 64);

	return (
		<CircleContext.Provider value={{ 
			circleGeometry, setRadius
		}}>
			{children}
		</CircleContext.Provider>
	)
}

CircleContext.displayName = "CircleContext";
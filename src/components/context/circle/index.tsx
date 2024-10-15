// React imports
import { useState, useContext, createContext } from 'react';

// Context imports
import { useMapbox } from '../mapbox';

// Third-party imports
import * as turf from '@turf/turf';

const CircleContext: React.Context<any> = createContext(null);

export const useCircle = () => {
	return (
		useContext(CircleContext)
	)
}

export const CircleProvider = ({children}: any) => {
	const { viewport } = useMapbox();
	const [ radius, setRadius ] = useState(1);

	const circleGeometry: any = turf.circle([viewport.longitude, viewport.latitude], radius);

	return (
		<CircleContext.Provider value={{ 
			circleGeometry, setRadius
		}}>
			{children}
		</CircleContext.Provider>
	)
}

CircleContext.displayName = "CircleContext";
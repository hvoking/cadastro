import { CircleProvider } from './circle';
import { MaskProvider } from './mask';
import { MapboxProvider } from './mapbox';
import { EventsProvider } from './events';

export const MainProvider = ({children}: any) => {
  return (
    <MapboxProvider>
    <EventsProvider>
    <CircleProvider>
    <MaskProvider>
      {children}
    </MaskProvider>
    </CircleProvider>
    </EventsProvider>
    </MapboxProvider>
  )
}

MainProvider.displayName="MainProvider";
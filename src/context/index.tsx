import { GeoProvider } from './geo';

export const ContextProvider = ({ children }: any) => {
  return (
    <GeoProvider>
      {children}
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";
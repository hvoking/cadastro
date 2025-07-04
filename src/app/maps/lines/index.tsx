// Third-party imports
import { Source, Layer, LayerProps } from 'react-map-gl/mapbox';

export const Lines = () => {
	const url = `
		https://geo.blumenau.sc.gov.br/server/rest/services/Cadastro_Imobiliario/Lotes_Blumenau/MapServer/export
		?bbox={bbox-epsg-3857}
		&bboxSR=3857
		&imageSR=3857
		&size=256,256
		&format=png32
		&transparent=true
		&f=image
		&layers=show:0
	`.replace(/\s/g, '');

	const parcelLayer: LayerProps = {
		id: 'blumenau-layer',
		source: 'blumenau-tiles',
		'source-layer': 'raster-style',
		type: 'raster',
		paint: {
			'raster-opacity': 1
		},
	};

	return (
		<Source 
			id="raster-style" 
			type="raster" 
			tiles={[url]}
			tileSize={256}
		>
			<Layer {...parcelLayer}/>
		</Source>
	)
}

Lines.displayName = "Lines";
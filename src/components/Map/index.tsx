import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { GeoJsonObject } from 'geojson';
import './styles.scss';
import { Props } from './types';
import { useEffect, useState } from 'react';
import { Neighborhood } from '../../types/models/Neighborhood';
import {
	MAP_BOUNDS,
	MAP_ZOOM,
	TILE_LAYER_ATTRIBUTION,
	TILE_LAYER_URL,
} from './utils';

export function Map({ handleFeatureClick, selectedFeatureId }: Props) {
	const [neighborhoodData, setNeighborhoodData] = useState<Neighborhood>();

	const getLocations = async () => {
		const response = await fetch('http://localhost:5173/bairros-geojson');
		const features = await response.json();

		setNeighborhoodData(features);
	};

	const geoJsonStyle = (feature: any) => {
		return {
			color:
				feature.properties.id === selectedFeatureId ? '#EB3131' : '#6c58ff',
			weight: feature.properties.id === selectedFeatureId ? 3 : 1,
		};
	};

	const mapStyle = { height: '100vh' };

	useEffect(() => {
		getLocations();
	}, []);

	return (
		<div className="map-container">
			<MapContainer style={mapStyle} bounds={MAP_BOUNDS} zoom={MAP_ZOOM}>
				<TileLayer url={TILE_LAYER_URL} attribution={TILE_LAYER_ATTRIBUTION} />
				{neighborhoodData && (
					<GeoJSON
						data={neighborhoodData as GeoJsonObject}
						style={geoJsonStyle}
						eventHandlers={{
							click: handleFeatureClick,
						}}
					/>
				)}
			</MapContainer>
		</div>
	);
}

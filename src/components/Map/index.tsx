import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { GeoJsonObject } from 'geojson';
import './styles.scss';
import { Props } from './types';
import { useEffect, useState } from 'react';
import { Neighborhood } from '../../types/models/Neighborhood';

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

	useEffect(() => {
		getLocations();
	}, []);

	return (
		<div className="map-container">
			<MapContainer
				style={{ height: '100vh' }}
				bounds={[
					[-23.234708, -45.928813],
					[-23.198917, -45.900761],
				]}
				zoom={15}
			>
				<TileLayer
					url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{neighborhoodData && (
					<GeoJSON
						data={neighborhoodData as GeoJsonObject}
						style={geoJsonStyle}
						eventHandlers={{
							click: (event) => handleFeatureClick(event),
						}}
					/>
				)}
			</MapContainer>
		</div>
	);
}

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Feature, Neighborhood } from './types/models/Neighborhood';
import { NeighborhoodPopulation } from './types/models/Population';
import type { GeoJsonObject } from 'geojson';
import { LeafletMouseEvent } from 'leaflet';
import { Sidebar } from './components/Sidebar';
import './app.scss';

export function App() {
	const [neighborhoodData, setNeighborhoodData] = useState<Neighborhood>();
	const [populationData, setPopulationData] = useState<
		NeighborhoodPopulation[]
	>([]);
	const [selectedNeighborhood, setSelectedNeighborhood] = useState<Feature>();

	const getLocations = async () => {
		const response = await fetch('http://localhost:5173/bairros-geojson');
		const features = await response.json();

		setNeighborhoodData(features);
	};

	const getPopulation = async (event: LeafletMouseEvent) => {
		setPopulationData([]);

		const feature = event.sourceTarget.feature;
		setSelectedNeighborhood(feature);

		const response = await fetch('http://localhost:5173/populacao');
		const allPopulations = await response.json();

		const data = allPopulations.filter(
			(item: NeighborhoodPopulation) =>
				item.id_geometria === feature.properties.id
		);

		setPopulationData(data);
	};

	useEffect(() => {
		getLocations();
	}, []);

	return (
		<main className="main">
			<Sidebar
				populationData={populationData}
				selectedNeighborhood={selectedNeighborhood}
			/>
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
							style={{ color: '#6c58ff' }}
							eventHandlers={{
								click: (event) => getPopulation(event),
							}}
						/>
					)}
				</MapContainer>
			</div>
		</main>
	);
}

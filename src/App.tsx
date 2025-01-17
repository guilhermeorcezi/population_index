import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Neighborhood } from './types/models/Neighborhood';
import { NeighborhoodPopulation } from './types/models/Population';
import type { GeoJsonObject } from 'geojson';
import { LeafletMouseEvent } from 'leaflet';

export function App() {
	const [neighborhoodData, setNeighborhoodData] = useState<Neighborhood>();
	const [population, setPopulation] = useState<NeighborhoodPopulation[]>([]);

	const getLocations = async () => {
		const response = await fetch('http://localhost:5173/bairros-geojson');
		const features = await response.json();

		setNeighborhoodData(features);
	};

	const getPopulation = async (event: LeafletMouseEvent) => {
		setPopulation([]);

		const feature = event.sourceTarget.feature;

		const response = await fetch('http://localhost:5173/populacao');
		const allPopulations = await response.json();

		const population = allPopulations.filter(
			(item: NeighborhoodPopulation) => item.id_geometria === feature.properties.id
		);

		setPopulation(population);
	};

	useEffect(() => {
		getLocations();
	}, []);

	return (
		<div>
			{population.length > 0 && (
				<div>
					{population.map((item) => (
						<p key={item.id_geometria}>
							Ano: {item.ano} / População: {item.populacao}
						</p>
					))}
				</div>
			)}
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
	);
}

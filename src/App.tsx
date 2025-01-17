import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Feature, Neighborhood } from './types/models/Neighborhood';
import { NeighborhoodPopulation } from './types/models/Population';
import { LeafletMouseEvent } from 'leaflet';
import { Sidebar } from './components/Sidebar';
import './app.scss';
import { Map } from './components/Map';

export function App() {
	const [populationData, setPopulationData] = useState<
		NeighborhoodPopulation[]
	>([]);
	const [selectedNeighborhood, setSelectedNeighborhood] = useState<Feature>();

	const getPopulationData = async (event: LeafletMouseEvent) => {
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

	return (
		<main className="main">
			<Sidebar
				populationData={populationData}
				selectedNeighborhood={selectedNeighborhood}
			/>
			<Map getPopulationData={getPopulationData} />
		</main>
	);
}

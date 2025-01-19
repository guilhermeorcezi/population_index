import { Fragment, useMemo } from 'react';
import './styles.scss';
import { FormattedPopulationData, Props } from './types';
import { Line } from './components/Line';

export function PopulationInfo({
	populationData,
	selectedNeighborhood,
}: Props) {
	const formattedPopulationData: FormattedPopulationData[] = useMemo(() => {
		if (!populationData || populationData.length === 0) return [];

		const sortedData = populationData
			.slice()
			.sort((a, b) => a.populacao - b.populacao);

		return sortedData.map((item, index) => ({
			...item,
			index,
		}));
	}, [populationData]);

	return (
		<Fragment>
			{selectedNeighborhood && (
				<Fragment>
					<div className="image-container">
						<img
							src={selectedNeighborhood.properties.image_url}
							alt={selectedNeighborhood.properties.name}
							className="neighborhood-image"
						/>
					</div>

					<div className="neighborhood-info">
						<h2>{selectedNeighborhood.properties.name}</h2>
						<span className="city">
							{selectedNeighborhood.properties.city} -{' '}
							{selectedNeighborhood.properties.state}
						</span>
					</div>
				</Fragment>
			)}

			<div className="separator" />

			{formattedPopulationData && formattedPopulationData.length > 0 && (
				<Fragment>
					<div className="population-info">
						<h3 className="population-info-title">População por ano</h3>

						{formattedPopulationData.map((population) => (
							<Line population={population} />
						))}
					</div>
					<div className="separator" />
				</Fragment>
			)}
		</Fragment>
	);
}

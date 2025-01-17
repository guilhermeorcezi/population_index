import { Fragment } from 'react';
import './styles.scss';
import { Props } from './types';
import { Line } from './components/Line';

export function PopulationInfo({
	populationData,
	selectedNeighborhood,
}: Props) {
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

			{populationData && populationData.length > 0 && (
				<Fragment>
					<div className="population-info">
						<h3 className="population-info-title">População por ano</h3>

						{populationData.map((population, index) => (
							<Line population={population} index={index} />
						))}
					</div>
					<div className="separator" />
				</Fragment>
			)}
		</Fragment>
	);
}

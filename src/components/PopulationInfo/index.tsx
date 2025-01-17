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
				<div className="neighborhood-info">
					<h2>{selectedNeighborhood.properties.name}</h2>
				</div>
			)}

			<div className="separator" />

			{populationData && populationData.length > 0 && (
				<div className="population-info">
					<h3 className="population-info-title">População por ano</h3>

					{populationData.map((population, index) => (
						<Line population={population} index={index} />
					))}
				</div>
			)}
		</Fragment>
	);
}

import { Fragment } from 'react';
import './styles.scss';
import logo from '../../assets/logo.svg';
import { Props } from './types';
import { PopulationInfo } from '../PopulationInfo';

export function Sidebar({ populationData, selectedNeighborhood }: Props) {
	return (
		<div className="sidebar">
			<div
				className={`sidebar-content ${
					!selectedNeighborhood && 'space-between'
				}`}
			>
				<div className="header">
					<img src={logo} alt="logo" />
					<h1>Índice populacional</h1>
				</div>

				{!selectedNeighborhood && (
					<div className="empty-container">
						<span className="empty-text">
							Clique em um dos bairros para visualizar o índice de população
						</span>
						<div />
					</div>
				)}

				<PopulationInfo
					populationData={populationData}
					selectedNeighborhood={selectedNeighborhood}
				/>
			</div>
		</div>
	);
}

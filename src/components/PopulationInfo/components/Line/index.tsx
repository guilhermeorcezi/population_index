import './styles.scss';
import { Props } from './types';

export function Line({ population,  }: Props) {
	const populationQuantity = population.populacao.toLocaleString('pt-BR');

	return (
		<div className="population-row">
			<span className="population-year">{population.ano}</span>
			<div className={`population-line line-${population.index}`} />
			<span className="population-quantity">{populationQuantity}</span>
		</div>
	);
}

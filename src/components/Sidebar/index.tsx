import './styles.scss';
import logo from '../../assets/logo.svg';

export function Sidebar() {
	return (
		<div className="sidebar" style={{}}>
			<div className="sidebar-content">
				<div className="header">
					<img src={logo} alt="logo" />
					<h1>Índice populacional</h1>
				</div>

				<p className="empty-text">
					Clique em um dos bairros para visualizar o índice de população
				</p>
				<div />

				{/* {population.length > 0 && (
						<div> 


							<h3>População</h3>
							{population.map((item) => (
								<p key={item.id_geometria}>
									Ano: {item.ano} / População: {item.populacao}
								</p>
							))}
						</div>
					)} */}
			</div>
		</div>
	);
}

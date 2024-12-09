import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { ReactIcons } from "../../components/Icon";

export default function Admin() {
	return (
		<>
			<h1>
				<b>Panel de Administrador</b>
			</h1>
			<Container>
				<Row>
					<Col xs={12} sm={2} md={4}>
						<div className="d-flex flex-column justify-content-center align-items-center">
							<ReactIcons library="MaterialIcons" iconName="MdAdminPanelSettings" size={96} />
							<Link to="/admin/usuarios">Módulo de Usuarios</Link>
						</div>
					</Col>
					<Col xs={12} sm={2} md={4}>
						<div className="d-flex flex-column justify-content-center align-items-center">
							<ReactIcons library="MaterialIcons" iconName="MdOutlineBook" size={96} />
							<Link to="/admin/textos">Módulo de Textos</Link>
						</div>
					</Col>
					<Col xs={12} sm={2} md={4}>
						<div className="d-flex flex-column justify-content-center align-items-center">
							<ReactIcons library="AntIcons" iconName="AiOutlineIdcard" size={96} />
							<Link to="/admin/clientes">Módulo de Clientes</Link>
						</div>
					</Col>
					<Col xs={12} sm={2} md={4}>
						<div className="d-flex flex-column justify-content-center align-items-center">
							<ReactIcons library="MaterialIcons" iconName="MdOutlineHandshake" size={96} />
							<Link to="/admin/prestamos">Módulo de Préstamos</Link>
						</div>
					</Col>
					<Col xs={12} sm={2} md={4}>
						<div className="d-flex flex-column justify-content-center align-items-center">
							<ReactIcons library="MaterialIcons" iconName="MdOutlineHistoryEdu" size={96} />
							<Link to="/admin/logs">Logs del Sistema</Link>
						</div>
					</Col>
					<Col xs={12} sm={2} md={4}>
						<div className="d-flex flex-column justify-content-center align-items-center">
							<ReactIcons library="MaterialIcons" iconName="MdBarChart" size={96} />
							<Link to="/admin/estadisticas">Estadísticas</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

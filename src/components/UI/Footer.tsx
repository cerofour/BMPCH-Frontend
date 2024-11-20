import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	return (
		<footer className="bg-white text-dark py-4 mx-4">
			<Container fluid>
				<Row className="homepage-band">
					{/* Dirección */}
					<Col md={6} className="mb-3">
						<h5>Biblioteca Municipal de Chiclayo</h5>
						<p>Dirección: Av. Ficticia 123, Chiclayo, Perú</p>
					</Col>

					{/* Contacto */}
					<Col md={6} className="mb-3">
						<h5>Contacto</h5>
						<p>Teléfono: +51 987 654 321</p>
						<p>Email: contacto@biblioteca-chiclayo.pe</p>
					</Col>

					{/* Derechos de Autor */}
					<Row>
						<Col md={12} className="text-md-center">
							<p>Todos los derechos reservados. &copy; 2024</p>
						</Col>
					</Row>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;

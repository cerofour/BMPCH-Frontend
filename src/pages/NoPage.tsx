import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoPage() {
	return (
		<Container className="d-flex flex-column align-items-center justify-content-center">
			<h1 className="display-4 text-center">Página no encontrada</h1>
			<p className="text-center mt-3">Lo sentimos, la página que buscas no existe.</p>
			<Link to="/">
				<Button variant="primary" className="mt-3">
					Volver a la página principal
				</Button>
			</Link>
		</Container>
	);
}

export default NoPage;

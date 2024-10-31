import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import BookGroup from "../components/BookGroup";

function Catalogue() {
	return (
		<>
			<Container className="my-4">
				{/* Search Bar */}
				<Row className="mb-4">
					<Col>
						<h1>
							<b>Catálogo</b>
						</h1>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col>
						<Form className="d-flex">
							<FormControl type="text" placeholder="Buscar libros..." />
						</Form>
					</Col>
					<Col>
						<Button variant="primary">Búsqueda</Button>
					</Col>
				</Row>

				<BookGroup></BookGroup>
			</Container>
		</>
	);
}

export default Catalogue;

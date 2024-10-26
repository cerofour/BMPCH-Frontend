import { Card, Form, Button, ListGroup } from "react-bootstrap";
import BookGroup from "../components/BookGroup";

function Catalogue() {
	return (
		<>
			<h1>Catálogo de Textos</h1>
			<Card>
				<Card.Body>
					<Form className="d-flex">
						<Form.Control type="search" placeholder="Buscar" className=" mr-sm-2" />
						<Button type="submit">Buscar</Button>
					</Form>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<BookGroup></BookGroup>
				</Card.Body>
			</Card>
		</>
	);
}

export default Catalogue;

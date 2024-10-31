import { Container, Row, Col } from "react-bootstrap";
import BookGroup from "../components/BookGroup";
import { SearchBar } from "../components/UIElements";

function Catalogue() {
	return (
		<>
			<Container>
				{/* Search Bar */}
				<Row className="mb-4">
					<Col>
						<h1>
							<b>Catálogo</b>
						</h1>
					</Col>
				</Row>
				<SearchBar placeholder="Buscar libros" buttonText="Buscar"></SearchBar>
				<BookGroup></BookGroup>
			</Container>
		</>
	);
}

export default Catalogue;

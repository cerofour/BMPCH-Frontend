import { useState, ChangeEvent } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { TextAPIObject } from "../api/types";

import BookGroup from "../components/BookGroup";
import { SearchBar } from "../components/UIElements";

function Catalogue() {
	const [predicate, setPredicate] = useState<((item: TextAPIObject) => boolean) | undefined>(undefined);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
		setPredicate(
			() => (item: TextAPIObject) => item.title.toLocaleLowerCase().includes(e.target.value.toLowerCase())
		);

	return (
		<>
			<Container>
				<Row className="mb-4">
					<Col>
						<h1>
							<b>Catálogo</b>
						</h1>
					</Col>
				</Row>
				{/* Search Bar */}
				<SearchBar onChangeInput={handleSearch} placeholder="Buscar libros" buttonText="Buscar"></SearchBar>
				<BookGroup predicate={predicate}></BookGroup>
			</Container>
		</>
	);
}

export default Catalogue;

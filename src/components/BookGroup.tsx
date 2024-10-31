import { useQuery } from "@tanstack/react-query";
import { getAllTexts, TextAPIObject } from "../api/api";

import { Link } from "react-router-dom";
import { Alert, Spinner, Card, Button, Col, Row } from "react-bootstrap";

function BookCard(book: TextAPIObject) {
	return (
		<Col key={book.id}>
			<Card className="text-card" style={{ width: "18rem" }}>
				<Card.Img variant="top" src={`https://placehold.co/300`} />
				<Card.Body>
					<Card.Title>{book.title}</Card.Title>
					<Card.Text>
						<small className="text-muted">
							Fecha de publicación: {book.publicationDate.toString()}
							<br></br>
							Editorial: {book.editorial.name}
						</small>
					</Card.Text>
					<Link className="text-card-link" to={"/catalogo/" + book.id}>
						<Button variant="outline-primary">Ver más información</Button>
					</Link>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default function BookGroup() {
	const { isLoading, isError, data, error } = useQuery<TextAPIObject[], Error>({
		queryKey: ["getAllTexts"],
		queryFn: getAllTexts,
	});

	if (isError) return <Alert variant="danger">Error al cargar textos: {JSON.stringify(error)}</Alert>;

	if (isLoading)
		return (
			<Alert variant="info">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Cargando textos...</span>
				</Spinner>
			</Alert>
		);

	return (
		<Row xs={1} md={2} lg={3} xxl={4} className="g-4">
			{data?.map(BookCard)}
		</Row>
	);
}

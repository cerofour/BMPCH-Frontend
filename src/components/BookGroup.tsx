import { useQuery } from "@tanstack/react-query";
import { getAllTexts } from "../api/api";
import { TextAPIObject } from "../api/types";

import { Link } from "react-router-dom";
import { Alert, Spinner, Card, Button, Col, Row } from "react-bootstrap";

import { FetchTextImageCard } from "./service/ImageService";

function BookCard(book: TextAPIObject) {
	return (
		<Col xs={12} key={book.id}>
			<Card className="text-card">
				<FetchTextImageCard variant="top" id={book.id}></FetchTextImageCard>
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

interface BookGroupProps {
	predicate?: (item: TextAPIObject) => boolean;
}

export default function BookGroup({ predicate }: BookGroupProps) {
	const { isLoading, isError, data, error } = useQuery<TextAPIObject[], Error>({
		queryKey: ["getAllTexts"],
		queryFn: getAllTexts,
	});

	if (isError) return <Alert variant="danger">Error al cargar textos: {JSON.stringify(error)}</Alert>;

	if (isLoading)
		return (
			<Alert variant="info" style={{ alignContent: "center", display: "flex" }}>
				<Spinner animation="border" role="status"></Spinner>
				<span className="mx-2">Cargando...</span>
			</Alert>
		);

	const filteredData: TextAPIObject[] | undefined = predicate ? data?.filter(predicate) : data;

	return (
		<Row xs={1} md={3} lg={4} xxl={5} className="g-4">
			{filteredData?.map(BookCard)}
		</Row>
	);
}

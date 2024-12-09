import { Container, Col, Row, Alert, Spinner } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getText } from "../api/api";
import { TextAPIObject } from "../api/types";
import { commaSeparatedAuthors } from "../components/Utils";

import { FetchTextImage } from "../components/service/ImageService";
import { useBreadcrumb } from "../hooks/BreadcrumbContext";

function BookPage() {
	const { id } = useParams<{ id: string }>(); // Retrieve the book ID from the URL

	if (!id) <Navigate to="/catalogo"></Navigate>;

	const { isLoading, isError, data } = useQuery<TextAPIObject, Error>({
		queryFn: () => getText(id ? parseInt(id) : 0),
		queryKey: ["getText"],
	}); // Evitar que se ejecute si `bookId` no es un número válido

	if (isLoading) return <Spinner animation="border" role="status"></Spinner>;
	if (!data) return <Alert variant="warning">Libro no encontrado</Alert>;
	if (isError) return <Alert variant="danger">Error al cargar el libro</Alert>; // Solucionar esto

	console.log(data);

	return (
		<Container className="my-5">
			<Row className="justify-content-center">
				<Col xs={12} md={6} lg={6}>
					<FetchTextImage id={data.id}></FetchTextImage>
				</Col>
				<Col xs={12} md={6} lg={6}>
					<h1>
						<strong>{data?.title}</strong>
					</h1>
					<strong>Fecha de publicación:</strong> {data?.publicationDate.toString()}
					<br></br>
					<strong>Páginas:</strong> {data?.pages}
					<br></br>
					<strong>Edición:</strong> {data?.edition}
					<br></br>
					<strong>Volumen:</strong> {data?.volume}
					<br></br>
					<strong>Editorial:</strong> {data?.editorial.name}
					<br></br>
					<strong>Tipo:</strong> {data?.type.typename}
					<br></br>
					<strong>Autores:</strong> {commaSeparatedAuthors(data?.authors || ["-"])}
					<br></br>
				</Col>
			</Row>
		</Container>
	);
}

export default BookPage;

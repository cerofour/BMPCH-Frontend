import { useQuery } from "@tanstack/react-query";

import { Navigate, useParams } from "react-router-dom";

import { Spinner, Alert, Container, Row, Col } from "react-bootstrap";

import { UserAPIObject } from "../../api/types";
import { getUserById } from "../../api/api";
import { prettifyUserNames } from "../../components/Utils";

export default function UserDetail() {
	const { id } = useParams<{ id: string }>(); // Retrieve the book ID from the URL

	if (!id) <Navigate to="/admin/clientes"></Navigate>;

	const { isLoading, isError, data } = useQuery<UserAPIObject, Error>({
		queryFn: () => getUserById(id ? parseInt(id) : 0),
		queryKey: ["getUserById"],
	}); // Evitar que se ejecute si `bookId` no es un número válido

	if (isLoading) return <Spinner animation="border" role="status"></Spinner>;
	if (!data) return <Alert variant="warning">Usuario no encontrado</Alert>;
	if (isError) return <Alert variant="danger">Error al cargar el usuario</Alert>; // Solucionar esto

	return (
		<Container className="my-5">
			<Row className="justify-content-center">
				<Col xs={12} md={6} lg={6}>
					<img
						src="https://placehold.co/300x450"
						alt="Imagen del usuario"
						style={{ maxHeight: "450px", objectFit: "cover" }}
					/>
				</Col>
				<Col xs={12} md={6} lg={6}>
					<h1>
						<strong>{prettifyUserNames(data)}</strong>
					</h1>
					<strong>Documento:</strong> {data?.document}
					<br></br>
					<strong>Género:</strong> {data?.gender.genderName}
					<br></br>
					<strong>Teléfono:</strong> {data?.phoneNumber}
					<br></br>
				</Col>
			</Row>
		</Container>
	);
}

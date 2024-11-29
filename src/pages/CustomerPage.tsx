import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { CustomerAPIObject } from "../api/types";
import { getCustomerById } from "../api/api";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";

function CustomerPage() {
    const {id} = useParams<{id: string}>();

    if (!id) <Navigate to="/catalogo"></Navigate>;

	const { isLoading, isError, data } = useQuery<CustomerAPIObject, Error>({
		queryFn: () => getCustomerById(id ? parseInt(id) : 0),
		queryKey: ["getCustomerById"],
	}); // Evitar que se ejecute si `customerId` no es un número válido

	if (isLoading) return <Spinner animation="border" role="status"></Spinner>;
	if (!data) return <Alert variant="warning">Libro no encontrado</Alert>;
	if (isError) return <Alert variant="danger">Error al cargar el libro</Alert>; // Solucionar esto

	return (
		<Container className="my-5">
			<Row className="justify-content-center">
				<Col xs={12} md={6} lg={6}>
					<img
						src="https://placehold.co/300x450"
						alt="Imagen del cliente"
						style={{ maxHeight: "450px", objectFit: "cover" }}
					/>
				</Col>
				<Col xs={12} md={6} lg={6}>
					<h1>
						<strong>Cliente</strong>
					</h1>
					<strong>Nombre:</strong> {`${data.user.name} ${data.user.plastName} ${data.user.mlastName}`}
					<br></br>
					<strong>Telefono:</strong> {`${data.user.phoneNumber}`}
					<br></br>
					<strong>Correo:</strong> {`${data.email}`}
					<br></br>
				</Col>
			</Row>
		</Container>
	);
}

export default CustomerPage;
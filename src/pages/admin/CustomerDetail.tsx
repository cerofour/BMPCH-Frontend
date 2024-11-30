import { useQuery } from "@tanstack/react-query";

import { Navigate, useParams, Link } from "react-router-dom";

import { Spinner, Alert, Container, Row, Col } from "react-bootstrap";

import { CustomerAPIObject } from "../../api/types";
import { getCustomerById } from "../../api/api";
import { prettifyAddress, prettifyUserNames } from "../../components/Utils";
import { FetchUserImage } from "../../components/service/ImageService";

export default function CustomersPage() {
	const { id } = useParams<{ id: string }>(); // Retrieve the book ID from the URL

	if (!id) <Navigate to="/admin/clientes"></Navigate>;

	const { isLoading, isError, data } = useQuery<CustomerAPIObject, Error>({
		queryFn: () => getCustomerById(id ? parseInt(id) : 0),
		queryKey: ["getCustomerById"],
	}); // Evitar que se ejecute si `bookId` no es un número válido

	if (isLoading) return <Spinner animation="border" role="status"></Spinner>;
	if (!data) return <Alert variant="warning">Cliente no encontrado</Alert>;
	if (isError) return <Alert variant="danger">Error al cargar el cliente</Alert>; // Solucionar esto

	return (
		<Container className="my-5">
			<Row className="justify-content-center">
				<Col xs={12} md={6} lg={6}>
					<FetchUserImage document={data?.user.document}></FetchUserImage>
				</Col>
				<Col xs={12} md={6} lg={6}>
					<h1>
						<strong>{prettifyUserNames(data.user)}</strong>
					</h1>
					<strong>Documento:</strong>{" "}
					<Link to={`/admin/usuarios/${data?.user.userId}`}>{data?.user.document}</Link>
					<br></br>
					<strong>Carnet:</strong> <Link to={`/admin/carnet/${data.carnet.id}`}>{data.carnet.code}</Link>
					<br></br>
					<strong>Fecha de Registro:</strong> {data?.carnet.carnetIssuanceDate.toString()}
					<br></br>
					<strong>Género:</strong> {data?.user.gender.genderName}
					<br></br>
					<strong>Correo:</strong> {data?.email}
					<br></br>
					<strong>Dirección:</strong> {prettifyAddress(data?.address)}
					<br></br>
					<strong>Teléfono:</strong> {data?.user.phoneNumber}
					<br></br>
				</Col>
			</Row>
		</Container>
	);
}

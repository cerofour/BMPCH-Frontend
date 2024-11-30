import { Container, Image, Row, Col, Table, Tab, Tabs, Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/api";
import { UserAPIObject } from "../api/types";
import { QRCodeSVG } from "qrcode.react";
import { FetchUserImageTest } from "../components/service/ImageService";

export default function Profile() {
	const { isLoading, isError, data } = useQuery<UserAPIObject, Error>({
		queryKey: ["getAuthenticatedUser"],
		queryFn: getMe,
	});

	let qrData: string;

	if (isLoading)
		return (
			<div className="d-flex justify-content-center align-items-center h-100">
				<Spinner animation="border" variant="primary" />
			</div>
		);
	else if (isError) qrData = "Error.";
	else qrData = data?.document || "example";

	const image = FetchUserImageTest({ document: data?.document });

	return (
		<Container fluid className="p-4">
			{/* Profile Header */}
			<Row className="mb-4">
				<Col md={12} className="text-center">
					{!image.loading && !image.error && (
						<Image src={image.blob} roundedCircle className="userProfilePicture my-3" />
					)}
					<h3>
						<b>{data?.name + " " + data?.plastName + " " + data?.mlastName}</b>
					</h3>
				</Col>
			</Row>

			{/* Profile Stats */}
			<Row className="my-3">
				<Col md={4} className="text-center">
					<QRCodeSVG value={qrData} size={128}></QRCodeSVG>
				</Col>
				<Col md={8} className="d-flex mb-3 flex-column justify-content-center">
					<Row>
						<Col>
							<h5>
								{" "}
								<b>{data?.documentTypeId == 1 ? "DNI" : "CE"} </b>
							</h5>
							<p>{data?.document}</p>
						</Col>
						<Col>
							<h5>
								<b>Rol</b>
							</h5>
							<p>{data?.roleId === 1 ? "Admin" : data?.roleId === 2 ? "Cliente" : "Bibliotecario"}</p>
						</Col>
						<Col>
							<h5>
								<b>Teléfono</b>
							</h5>
							<p>{data?.phoneNumber}</p>
						</Col>
					</Row>
				</Col>
			</Row>

			{/* Profile Content */}
			<Row>
				<Col md={12}>
					<Tabs defaultActiveKey={"prestamosActivos"} className="mb-3">
						<Tab eventKey={"prestamosActivos"} title={"Prestamos Activos"}>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Texto</th>
										<th>Inicio</th>
										<th>Fecha Programada</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Libro de Ejemplo</td>
										<td>25 de Octubre 2024</td>
										<td>30 de Octubre 2024</td>
									</tr>
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey={"prestamos"} title={"Prestamos"}>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Texto</th>
										<th>Inicio</th>
										<th>Fecha Programada</th>
										<th>Fin</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Libro de Ejemplo</td>
										<td>25 de Octubre 2024</td>
										<td>30 de Octubre 2024</td>
										<td>29 de Octubre 2024</td>
									</tr>
								</tbody>
							</Table>
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</Container>
	);
}

import { Container, Row, Col, Table, Tab, Tabs, Button, Image } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getMe, UserAPIObject } from "../api/api";
import { QRCodeSVG } from "qrcode.react";

export default function Profile() {
	const { isLoading, isError, data } = useQuery<UserAPIObject, Error>({
		queryKey: ["getAuthenticatedUser"],
		queryFn: getMe,
	});

	let document: string | undefined = undefined;

	if (isLoading) document = "Cargando...";
	else if (isError) document = "Error.";
	else document = data?.document;

	const qrData = data?.document || "example";

	return (
		<Container fluid className="p-4">
			{/* Profile Header */}
			<Row className="mb-4">
				<Col md={12} className="text-center">
					{/* Profile Picture */}
					<Image
						src="https://content.imageresizer.com/images/memes/War-Cat-meme-88f6yf.jpg"
						roundedCircle
						width="150"
						height="150"
						className="mb-3"
					/>
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
							<p>Admin</p>
						</Col>
						<Col>
							<h5>
								<b>Teléfono</b>
							</h5>
							<p>{data?.phoneNumber}</p>
						</Col>
					</Row>
					<Row>
						<Button variant="primary">Editar perfil</Button>
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

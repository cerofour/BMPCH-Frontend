//import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { NavDropdown, Button, NavbarCollapse, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getMe, UserAPIObject } from "../api/api";
import { useAuth } from "../hooks/useAuth";

function UserInformation() {
	const { authenticated } = useAuth();

	if (authenticated() == false) {
		return <Nav.Link href="/login">Ingresar</Nav.Link>;
	}

	const { isLoading, isError, data } = useQuery<UserAPIObject, Error>({
		queryKey: ["getAuthenticatedUser"],
		queryFn: getMe,
	});

	if (isLoading)
		return (
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Cargando...</span>
			</Spinner>
		);
	else if (isError) return <b>Error al cargar</b>;

	return (
		<NavDropdown title={data?.document} id="basic-nav-dropdown">
			<Link to="/perfil">
				<NavDropdown.Item href="/perfil">Mi Perfil</NavDropdown.Item>
			</Link>
			<Link to="/logout">
				<NavDropdown.Item href="/logout">Cerrar Sesión</NavDropdown.Item>
			</Link>
		</NavDropdown>
	);
}

interface MyNavbarProps {
	toggleSidebar: () => void;
	title: string;
	children: any;
}

export default function MyNavbar({ toggleSidebar, title }: MyNavbarProps) {
	// ../assets/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png
	return (
		<>
			<Navbar expand="md" sticky="top" className="bg-body-tertiary">
				<Container fluid>
					<Navbar.Brand href="/">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png/1200px-Escudo_de_Armas_la_Ciudad_de_Chiclayo.png"
							alt="Logo de la Municipalidad Provincial de Chiclayo"
							width={40}
							height={40}
						/>{" "}
						{title}
					</Navbar.Brand>

					<Form>
						<Row>
							<Col xs="auto">
								<Button variant="dark" onClick={toggleSidebar} className="d-md-none mt-2">
									☰ Menú
								</Button>
							</Col>
						</Row>
					</Form>
					<Nav className="justify-content-end flex-grow-1 pe-3">
						<Navbar.Text></Navbar.Text>
						<UserInformation></UserInformation>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

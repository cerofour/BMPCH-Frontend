//import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { NavDropdown, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/api";
import { UserAPIObject } from "../api/types";
import { useAuth } from "../hooks/useAuth";
import { BootstrapIcons } from "./Icon";

export function UserInformation({showNavDropDown = false}: {showNavDropDown?: boolean}) {
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
			<Spinner animation="border" role="status" />
		);
	if (isError) return <b>Error al cargar</b>;

	const title = (
		<span style={{ whiteSpace: 'pre-line' }}>
			Hola, <b>{`${data?.name} ${data?.plastName}\n`}</b>{`${data?.document}`}
		</span>
	);

	const navDropDown = (
		<NavDropdown title={title} id="basic-nav-dropdown">
			<Link to="/perfil">
				<NavDropdown.Item href="/perfil">Mi Perfil</NavDropdown.Item>
			</Link>
			<Link to="/logout">
				<NavDropdown.Item href="/logout">Cerrar Sesión</NavDropdown.Item>
			</Link>
		</NavDropdown>
	);

	return (
		<div className="d-flex">
			<BootstrapIcons iconName="PersonCircle" size={50} className="mx-2"/>
			{showNavDropDown ? navDropDown : title}
		</div>
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
			<Navbar expand="md" sticky="top" className="bg-body-tertiary mynavbar" >
				<Container fluid>
					<Navbar.Brand href="/">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png/1200px-Escudo_de_Armas_la_Ciudad_de_Chiclayo.png"
							alt="Logo de la Municipalidad Provincial de Chiclayo"
							width={50}
							height={50}
						/>
						<span className="d-none d-md-inline mx-2">{title}</span>
					</Navbar.Brand>

					<Button variant="dark" onClick={toggleSidebar} className="d-md-none mx-3">
						<BootstrapIcons iconName="MenuButtonWide" size={25}/> Menú
					</Button>

					<div className="pe-4  d-none d-md-flex">
						<div className="vr"></div>
						<UserInformation showNavDropDown={true}/>
					</div>
				</Container>
			</Navbar>
		</>
	);
}

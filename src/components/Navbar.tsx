// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import MyMenuButton from "./MenuButton";
import MyUserProfile from "./UserProfile";
import { Stack } from "react-bootstrap";

interface MyNavbarProps {
	onToggleSidebar: () => void;
}

export default function MyNavbar({onToggleSidebar}: MyNavbarProps) {

	const navbarTitle = "Biblioteca Municipal de Chiclayo";

	// ../assets/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png
	return (
		<>
			<Navbar expand="md" className="bg-body-tertiary">
				<Container fluid>
					<Navbar.Brand href="/">
						<Stack direction="horizontal" gap={2} className="align-items-center text-nowrap">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png/1200px-Escudo_de_Armas_la_Ciudad_de_Chiclayo.png"
								alt="Logo de la Municipalidad Provincial de Chiclayo"
								width={40}
								height={40}
							/>
							<h5 className="mb-0 d-none d-md-block">{navbarTitle}</h5>
						</Stack>
					</Navbar.Brand>
					<Nav className="justify-content-start flex-grow-1 ps-0">
						<MyMenuButton onClick={onToggleSidebar}/>
					</Nav>
					<Nav className="justify-content-end">
						<MyUserProfile/>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

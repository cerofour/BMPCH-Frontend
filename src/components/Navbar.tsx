import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import MySidebar from "./Sidebar";

export default function MyNavbar() {

	const navbarTitle = "Biblioteca Municipal de Chiclayo";

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	// ../assets/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png
	return (
		<>
			<Navbar expand="md" className="bg-body-tertiary mb-3">
				<Container fluid>
					<Navbar.Brand href="/">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png/1200px-Escudo_de_Armas_la_Ciudad_de_Chiclayo.png"
							alt="Logo de la Municipalidad Provincial de Chiclayo"
							width={40}
							height={40}
						/>
						{navbarTitle}
					</Navbar.Brand>
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-md`}
						aria-labelledby={`offcanvasNavbarLabel-expand-md`}
						placement="end"
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>{navbarTitle}</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-start flex-grow-1 ps-3">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg"
									alt="Boton menu"
									width={40}
									height={40}
									onClick={handleShow}
								/>
							</Nav>
							<Form className="d-flex">
								<Form.Control
									type="search"
									placeholder="Búsqueda de textos"
									className="me-2"
									aria-label="Search"
								/>
								<Button variant="outline-success">Buscar</Button>
							</Form>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			<Offcanvas show={show} onHide={handleClose}>
        		<MySidebar/>
      		</Offcanvas>
		</>
	);
}

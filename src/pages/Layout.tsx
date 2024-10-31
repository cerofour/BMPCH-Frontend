import { useState } from "react";
import MyNavbar from "../components/Navbar";
import { Container, Row, Col, Nav, Offcanvas } from "react-bootstrap";

import { Outlet } from "react-router-dom";

export function Layout() {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleSidebarToggle = () => setShowSidebar(!showSidebar);
	const x = (d: string, l: string) => {
		return {
			display: d,
			link: l,
		};
	};

	const title = "Biblioteca Municipal de Chiclayo";

	const navbarLinks = [
		x("Panel Admin", "/admin-panel"),
		x("Perfil", "/perfil"),
		x("Catálogo", "/catalogo"),
		x("Ayuda", "/ayuda"),
	].map((link, i) => (
		<Nav.Link key={i} href={link.link}>
			<b>{link.display}</b>
		</Nav.Link>
	));

	//console.log(navbarLinks);

	return (
		<>
			<MyNavbar toggleSidebar={handleSidebarToggle} title={title}>
				{navbarLinks}{" "}
			</MyNavbar>
			<Container fluid>
				<Row>
					{/* Sidebar for large screens */}
					<Col md={3} lg={2} className="d-none d-md-block text-light sidebar">
						<Nav className="flex-column">
							{navbarLinks}
						</Nav>
					</Col>

					{/* Toggle button for small screens */}
					{/* Offcanvas Sidebar for small screens */}
					<Offcanvas show={showSidebar} onHide={handleSidebarToggle} placement="start">
						<Offcanvas.Header closeButton>
							<Offcanvas.Title>Menu</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="flex-column">{navbarLinks}</Nav>
						</Offcanvas.Body>
					</Offcanvas>

					{/* Main Content */}
					<Col md={9} lg={10} className="my-4">
						<Outlet></Outlet>
					</Col>
				</Row>
			</Container>
		</>
	);
}

import { useState } from "react";
import MyNavbar from "../UI/Navbar";
import { Container, Nav } from "react-bootstrap";

import { Outlet } from "react-router-dom";

export default function UserLayout() {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleSidebarToggle = () => setShowSidebar(!showSidebar);
	const title = "Biblioteca Municipal de Chiclayo";

	//console.log(navbarLinks);

	return (
		<>
			<MyNavbar toggleSidebar={handleSidebarToggle} title={title}>
				<Nav.Link className="text-light" href="/catalogo">
					Catálogo
				</Nav.Link>
				<Nav.Link className="text-light" href="/perfil">
					Perfil
				</Nav.Link>
			</MyNavbar>
			<Container fluid className="my-4">
				<Outlet></Outlet>
			</Container>
		</>
	);
}

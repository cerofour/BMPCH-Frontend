import { useState } from "react";
import MyNavbar from "../UI/Navbar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Footer from "../UI/Footer";

export default function HomeLayout() {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleSidebarToggle = () => setShowSidebar(!showSidebar);

	const title = "Biblioteca Municipal de Chiclayo";

	//console.log(navbarLinks);

	return (
		<>
			<MyNavbar toggleSidebar={handleSidebarToggle} title={title}>
				{""}
			</MyNavbar>
			<Container fluid className="px-0">
				<Outlet></Outlet>
			</Container>
			<Footer></Footer>
		</>
	);
}

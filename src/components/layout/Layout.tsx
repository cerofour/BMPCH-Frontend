import { useState } from "react";
import MyNavbar from "../UI/Navbar";
import { Container, Row, Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import { Sidebar } from "../UI/Sidebar";

export default function Layout() {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleSidebarToggle = () => setShowSidebar(!showSidebar);

	const title = "Biblioteca Municipal de Chiclayo";

	//console.log(navbarLinks);

	return (
		<>
			<MyNavbar toggleSidebar={handleSidebarToggle} title={title}>
				{""}
			</MyNavbar>
			<Container fluid>
				<Row>
					{/* Sidebar */}
					<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
					{/* Main Content */}
					<Col md={9} lg={10} className="my-5">
						<Outlet></Outlet>
					</Col>
				</Row>
			</Container>
		</>
	);
}

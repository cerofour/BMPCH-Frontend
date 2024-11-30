import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components/UI/Sidebar";
import MyNavbar from "../../components/UI/Navbar";

export default function AdminLayout() {
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
					<AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
					{/* Main Content */}
					<Col md={9} lg={10} className="my-5">
						<Outlet></Outlet>
					</Col>
				</Row>
			</Container>
		</>
	);
}

import { useState } from "react";
import MyNavbar from "../UI/Navbar";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

import { Outlet, Link } from "react-router-dom";

import { AdminSidebar } from "../UI/Sidebar";
import { useBreadcrumb } from "../../hooks/BreadcrumbContext";

export default function UserLayout() {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleSidebarToggle = () => setShowSidebar(!showSidebar);
	const title = "Biblioteca Municipal de Chiclayo";

	//console.log(navbarLinks);

	return (
		<>
			<MyNavbar toggleSidebar={handleSidebarToggle} title={title}>
				{""}
			</MyNavbar>
			<Container fluid className="my-4">
				<Row>
					<AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

					<Col md={9} lg={10} className="my-1">
						<Outlet></Outlet>
					</Col>
				</Row>
			</Container>
		</>
	);
}

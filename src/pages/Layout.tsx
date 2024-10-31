import { useState } from "react";
import MyNavbar from "../components/Navbar";
import { Container, Row, Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import MySidebar from "../components/Sidebar";

export function Layout() {

	//Para mostrar u ocultar la sidebar
	const [showSidebar, setShowSidebar] = useState(true);
	const sidebarWidth = showSidebar ? '200px' : '0';
	const handleToggleSidebar = () => setShowSidebar(prev => !prev);
	const handleCloseSidebar = () => setShowSidebar(false);

	return (
		<>
			<div className="main">
				<MyNavbar setShowSidebar={handleToggleSidebar}></MyNavbar>
				<Container>
					<Row>
						{/*
						<Col md={3} lg={2} className="sidebar">
							<div className="p-3">
								<small>Menú</small>
								<ul className="list-unstyled">
									<li>Today</li>
									<li>Yesterday</li>
									<li>Last 7 Days</li>
									<li>Settings</li>
									<li>Profile</li>
								</ul>
							</div>
						</Col>
						*/}
						<Container style={{height: '100%'}}>
							<MySidebar show={showSidebar} onClose={handleCloseSidebar}/>
						</Container>
						{/* Main Content */}
						<Col className="main-container" style={{paddingLeft: sidebarWidth}}>
							<Outlet></Outlet>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

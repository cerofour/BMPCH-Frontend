import MyNavbar from "../components/Navbar";
import { Container, Row, Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";

export function Layout() {
	return (
		<>
			<MyNavbar></MyNavbar>
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

					{/* Main Content */}
					<Col className="main-container">
						<Outlet></Outlet>
					</Col>
				</Row>
			</Container>
		</>
	);
}

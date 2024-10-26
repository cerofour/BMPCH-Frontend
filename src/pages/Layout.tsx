import MyNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<>
			<MyNavbar></MyNavbar>

			<Container fluid>
				<div className="main-container">
					<Outlet></Outlet>
				</div>
			</Container>
		</>
	);
}
export default Layout;

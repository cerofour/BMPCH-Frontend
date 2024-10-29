import { useState } from "react";
import MyNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import MySidebar from "../components/Sidebar";

function Layout() {
	const [showSidebar, setShowSidebar] = useState(false);

	const handleToggleSidebar = () => setShowSidebar(prev => !prev);
	const handleCloseSidebar = () => setShowSidebar(false);

	return (
		<>
			<MyNavbar onToggleSidebar={handleToggleSidebar}></MyNavbar>
			<Container fluid style={{backgroundColor: '#ececf0', paddingTop: "30px", height: '100vh'}}>
				<div className="main-container">
					<Outlet></Outlet>
				</div>
			</Container>
			<MySidebar show={showSidebar} onClose={handleCloseSidebar}/>
		</>
	);
}
export default Layout;

import { useState } from "react";
import MyNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import MySidebar from "../components/Sidebar";

function Layout() {
	const [showSidebar, setShowSidebar] = useState(true);

	const handleToggleSidebar = () => setShowSidebar(prev => !prev);
	const handleCloseSidebar = () => setShowSidebar(false);

	return (
		<>
			<MyNavbar onToggleSidebar={handleToggleSidebar}></MyNavbar>
			<Container fluid style={{backgroundColor: '#ececf0', height: '100%'}}>
				<div>
					<MySidebar show={showSidebar} onClose={handleCloseSidebar}/>
				</div>
				<div style={{paddingTop:'50px'}}>
					<div className="main-container">
						<Outlet/>
					</div>
				</div>
			</Container>
		</>
	);
}
export default Layout;

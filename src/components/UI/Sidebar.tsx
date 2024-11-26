import { UserInformation } from "./Navbar";
import { Accordion, Col, Nav, Offcanvas } from "react-bootstrap";

import { ReactIcons } from "../Icon";

type x1 = {
	display: string;
	link: string;
	icon: any;
	sublinks?: y1[] | undefined;
};

type y1 = {
	display: string;
	link: string;
	icon: any;
};

export function Sidebar({ showSidebar, setShowSidebar }: any) {
	const handleSidebarToggle = () => setShowSidebar(!showSidebar);

	const x = (d: string, l: string, i: any, sl?: y1[] | undefined): x1 => {
		return {
			display: d,
			link: l,
			icon: i,
			sublinks: sl,
		};
	};

	const generateNavLink = (element: y1, key: number) => {
		console.log(element);
		return (
			<Nav.Link key={key} href={element.link}>
				<ReactIcons library="AntIcons" iconName={element.icon} size={24} />
				<b className="mx-2">{element.display}</b>
			</Nav.Link>
		);
	};

	const navbarLinks = [
		x("Perfil", "/perfil", "AiOutlineUser"),
		x("Página Principal", "/", "AiOutlineHome"),
		x("Panel Admin", "", "AiOutlineAppstore", [
			x("Usuarios", "/admin-panel", "AiOutlineUsergroupAdd"),
			x("Clientes", "/admin-panel", "AiOutlineIdcard"),
			x("Textos", "/admin-panel", "AiOutlineBook"),
		]),
		x("Catálogo", "/catalogo", "AiOutlineInsertRowAbove"),
		x("Ayuda", "/ayuda", "AiOutlineQuestionCircle"),
	].map((link, i) => (
		<Accordion.Item eventKey={i.toString()} style={{ border: "none" }}>
			{link.sublinks !== undefined ? (
				<>
					<Accordion.Header className="custom-accordion-header">
						<ReactIcons library="AntIcons" iconName={link.icon} size={24} />
						<b className="mx-2">{link.display}</b>
					</Accordion.Header>
					<Accordion.Body className="custom-accordion-body">
						{link.sublinks.map((link1, i) => generateNavLink(link1, i))}
					</Accordion.Body>
				</>
			) : (
				generateNavLink(link, i)
			)}
		</Accordion.Item>
	));

	//console.log(navbarLinks);

	return (
		<>
			<Col md={3} lg={2} className="d-none d-md-block text-light sidebar">
				<Nav className="flex-column">
					<Accordion>{navbarLinks}</Accordion>
				</Nav>
			</Col>

			{/* Toggle button for small screens */}
			{/* Offcanvas Sidebar for small screens */}
			<Offcanvas show={showSidebar} onHide={handleSidebarToggle} placement="start">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Menu</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<UserInformation />
					<hr />
					<Nav className="flex-column">
						<Accordion>{navbarLinks}</Accordion>
					</Nav>
					<hr />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

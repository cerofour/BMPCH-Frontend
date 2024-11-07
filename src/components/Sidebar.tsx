import { UserInformation } from "../components/Navbar";
import { Accordion, Col, Nav, Offcanvas } from "react-bootstrap";

import { Icon } from "../components/Icon";

type x1 = {
    display: string;
    link: string;
    icon: any;
    sublinks?: y1[] | undefined
}

type y1 = {
    display: string;
    link: string;
    icon: any;
}

export function Sidebar({showSidebar, setShowSidebar}: any) {

	const handleSidebarToggle = () => setShowSidebar(!showSidebar);

	const x = (d: string, l: string, i: any, sl?: y1[] | undefined): x1  => {
		return {
			display: d,
			link: l,
			icon: i,
            sublinks: sl
		};
	};

    const generateNavLink = (element: y1, key: number) => {
        return (
        <Nav.Link key={key} href={element.link}>
            <Icon iconName={element.icon} size={20}/><b className="mx-2">{element.display}</b>
        </Nav.Link>)
    }

	const navbarLinks = [
		x("Perfil", "/perfil", "PersonFill"),
        x("Home", "/", "HouseFill"),
		x("Panel Admin", "", "GearFill", 
            [x("Tabla de usuarios", "/admin-panel", "Table"), 
             x("Tabla de textos", "/admin-panel", "Table"),
             x("Tabla de clientes", "/admin-panel", "Table")]
        ),
		x("Catálogo", "/catalogo", "BookFill"),
		x("Ayuda", "/ayuda", "QuestionCircle"),
	].map((link, i) => (
        <Accordion.Item eventKey={i.toString()} style={{border: "none"}}>
            {(link.sublinks !== undefined) 
            ? 
            <>
                <Accordion.Header>
                    <Icon iconName={link.icon} size={20}/>
                    <b className="mx-2">{link.display}</b>
                </Accordion.Header>
                <Accordion.Body>
                    {link.sublinks.map((link1, i) => generateNavLink(link1, i))}
                </Accordion.Body>
            </>
            :
            generateNavLink(link, i)}
        </Accordion.Item>

	));

	//console.log(navbarLinks);

	return (
		<>
            <Col md={3} lg={2} className="d-none d-md-block text-light sidebar">
				<Nav className="flex-column">
                    <Accordion>
					    {navbarLinks}
                    </Accordion>
				</Nav>
			</Col>

			{/* Toggle button for small screens */}
			{/* Offcanvas Sidebar for small screens */}
			<Offcanvas show={showSidebar} onHide={handleSidebarToggle} placement="start">
			    <Offcanvas.Header closeButton>
					<Offcanvas.Title>Menu</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<UserInformation/>
					<hr/>
					<Nav className="flex-column">
                        <Accordion>
                            {navbarLinks}
                        </Accordion>
                    </Nav>
					<hr/>
					<Nav.Link key="logout" href="/logout">
                        <Icon iconName="BoxArrowRight" size={20}/>
                        <b className="mx-2">Cerrar Sesión</b>
					</Nav.Link>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

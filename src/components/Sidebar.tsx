import { Nav, Offcanvas } from "react-bootstrap";
import MyOptionLink from "./OptionLink";

export default function MySidebar() {

    const sidebarTittle = "Menú";

    const x = (d: string, l: string) => {
		return {
			display: d,
			link: l,
		};
	};

	const sidebarLinks = [
		//x("Menu", "/"),
		x("Panel Admin", "admin-panel"),
		x("Perfil", "perfil"),
		x("Catálogo", "catalogo"),
		x("Ayuda", "ayuda"),
	];

	//console.log(navbarLinks);

	const tsxLinks = sidebarLinks.map((link, i) => (
		MyOptionLink(link, i)
	));

    return(
        <>
            <Offcanvas.Header closeButton>
          		<Offcanvas.Title>{sidebarTittle}</Offcanvas.Title>
        	</Offcanvas.Header>
        	<Offcanvas.Body>
                <Nav className="d-flex flex-column align-items-start flex-grow-1 ps-3">{tsxLinks}</Nav>
        	</Offcanvas.Body>
        </>
    );
}
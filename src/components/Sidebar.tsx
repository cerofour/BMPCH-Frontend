import { Nav, Offcanvas } from "react-bootstrap";

export default function MySidebar() {

    const sidebarTittle = "Menú";

    const x = (d: string, l: string) => {
		return {
			display: d,
			link: l,
		};
	};

	const navbarLinks = [
		//x("Bib. MPCH", "/"),
		x("Panel Admin", "admin-panel"),
		x("Perfil", "perfil"),
		x("Catálogo", "catalogo"),
		x("Ayuda", "ayuda"),
	];

	//console.log(navbarLinks);

	const tsxLinks = navbarLinks.map((link, i) => (
		<Nav.Link key={i} href={link.link}>
			{link.display}
		</Nav.Link>
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
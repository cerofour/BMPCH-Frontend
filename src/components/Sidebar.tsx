import { Nav, Offcanvas } from "react-bootstrap";
import MyOptionLink from "./OptionLink";
import MyOptionAccordion from "./OptionAccordion";

export default function MySidebar() {

    const sidebarTittle = "Menú";

    const x = (d: string, l: string) => {
		return {
			display: d,
			link: l,
		};
	};

	const y = (d: string, s: ReturnType<typeof x>[]) => {
		return {
			display: d,
			subOptions: s,
		};
	};

	const a = (links: ReturnType<typeof x>[]) => {
		return links.map((link, i) =>
			MyOptionLink(link, i),
		);
	}

	const sidebarOptions = [
		//x("Menu", "/"),
		x("Panel Admin", "admin-panel"),
		x("Perfil", "perfil"),
		x("Catálogo", "catalogo"),
		x("Ayuda", "ayuda"),
		y("Recursos",[
			x("Nuevo recurso", "nuevo-recurso")
		])
	];

	//console.log(navbarLinks);

	const tsxLinks = sidebarOptions.map((option, i) => {
		if ('subOptions' in option) {
			const tsxSubOptions = a(option.subOptions)
			return MyOptionAccordion(option.display, tsxSubOptions)
		} else {
			return MyOptionLink(option, i)
		}
	});

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
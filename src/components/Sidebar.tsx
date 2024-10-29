import { Nav, Offcanvas, Stack } from "react-bootstrap";
import MyOptionLink from "./OptionLink";
import MyOptionAccordion from "./OptionAccordion";

interface MySidebarProps {
    show: boolean;
    onClose: () => void;
}

export default function MySidebar({show, onClose}: MySidebarProps) {

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
            subLinks: s,
        };
    };

    const a = (l: ReturnType<typeof x>[]) => {
        return l.map((link, i) => (MyOptionLink(link, i)))
    }

	const sidebarLinks = [
		//x("Menu", "/"),
        //y("Menu", [x("Submenu", "/")])
        x("Inicio","catalogo"),
        y("Recursos",[
            x("Nuevo recurso", "nuevo-recurso"),
            x("Gestionar recursos", "gestionar-recusos"),
        ]),
        y("Préstamos", [
            x("Nuevo préstamo", "nuevo-prestamo"),
            x("Gestionar préstamos", "gestionar-prestamos")
        ]),
        y("Usuarios", [
            x("Nuevo lector", "nuevo-lector"),
            x("Gestionar lectores", "gestionar-lector"),
            x("Nuevo trabajador", "nuevo-trabajador"),
            x("Gestionar trabajador", "admin-panel"), //Redirige a admin-panel
        ]),
        x("Estadísticas", "estadisticas"),
        x("Cerrar sesión", "/"),
		// x("Panel Admin", "admin-panel"),
		// x("Perfil", "perfil"),
		// x("Catálogo", "catalogo"),
        // x("Ayuda", "ayuda"),
	];

	//console.log(navbarLinks);

	// const tsxLinks = sidebarLinks.map((link, i) => (
	// 	MyOptionLink(link, i)
	// ));

    const tsxLinks = sidebarLinks.map((link, i) => {
        if ("link" in link) {
            return MyOptionLink(link, i)
        } else {
            const tsxSubLinks = a(link.subLinks)
            return MyOptionAccordion(link.display, tsxSubLinks)
        }
    });

    return(
        <>
            <div className={`my-sidebar ${show ? '' : 'close'}`}>
                <Stack direction="horizontal" className="align-items-center justify-content-between">
                    <h6 style={{color:'#808080',  margin: '0'}}>{sidebarTittle}</h6>
                    <div>
                        <button onClick={onClose} className="close-button ">X</button>
                    </div>
                </Stack>
                <Stack gap={3}>
                    {tsxLinks}
                </Stack>
            </div>
        </>
    );
}
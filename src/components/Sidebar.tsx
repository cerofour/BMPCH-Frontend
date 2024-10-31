import { Stack } from "react-bootstrap";
import MyMenuLink from "./MenuLink";
import MyMenuAccordion from "./MenuAccordion";

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
        return l.map((link, i) => (MyMenuLink(link, i)))
    }

	const sidebarLinks = [
		//x("Menu", "/"),
        //y("Menu", [x("Submenu", "/")])
        x("Inicio","/"),
        x("Catálogo", "catalogo"),
        y("Recursos",[
            x("Nuevo recurso", "nuevo-recurso"),
            x("Gestionar recursos", "gestionar-recursos"),
        ]),
        y("Préstamos", [
            x("Nuevo préstamo", "nuevo-prestamo"),
            x("Gestionar préstamos", "gestionar-prestamos")
        ]),
        y("Usuarios", [
            x("Nuevo lector", "nuevo-lector"),
            x("Gestionar lectores", "gestionar-lectores"),
            x("Nuevo trabajador", "nuevo-trabajador"),
            x("Gestionar trabajadores", "gestionar-trabajadores"), //Redirige a admin-panel
        ]),
        x("Estadísticas", "estadisticas"),
        x("Cerrar sesión", "login"),
		x("Panel Admin", "admin-panel"),
		x("Perfil", "perfil"),
		// x("Catálogo", "catalogo"),
        // x("Ayuda", "ayuda"),
	];

    const tsxLinks = sidebarLinks.map((link, i) => {
        if ("link" in link) {
            return MyMenuLink(link, i)
        } else {
            const tsxSubLinks = a(link.subLinks)
            return MyMenuAccordion(link.display, tsxSubLinks)
        }
    });

    return(
        <>
            <div>
                <div className={`my-sidebar ${show ? '' : 'close'}`}>
                    <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
                        <h6 style={{color:'#808080',  margin: '0'}}>{sidebarTittle}</h6>
                        <div>
                            <button onClick={onClose} className="close-button">X</button>
                        </div>
                    </Stack>
                    <Stack gap={3}>
                        {tsxLinks}
                    </Stack>
                </div>
            </div>
        </>
    );
}
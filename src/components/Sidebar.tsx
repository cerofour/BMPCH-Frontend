import { Offcanvas } from "react-bootstrap";

export default function MySidebar() {

    const sidebarTittle = "Menú";

    return(
        <>
            <Offcanvas.Header closeButton>
          			<Offcanvas.Title>{sidebarTittle}</Offcanvas.Title>
        		</Offcanvas.Header>
        		<Offcanvas.Body>
          			A
        		</Offcanvas.Body>
        </>
    );
}
import { Nav } from "react-bootstrap";

export default function MyMenuLink(link: {link: string, display: string}, i: number) {
    return (
        <>
            <Nav.Link key={i} href={link.link}>
			    {link.display}
		    </Nav.Link>
        </>
    );
}
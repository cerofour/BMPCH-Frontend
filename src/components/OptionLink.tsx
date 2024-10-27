import { Nav } from "react-bootstrap";

export default function MyOptionLink(link: {link: string, display: string}, i: number) {
    return (
        <>
            <Nav.Link key={i} href={link.link}>
			    {link.display}
		    </Nav.Link>
        </>
    );
}
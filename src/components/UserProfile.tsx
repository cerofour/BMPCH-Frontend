import {Container, Stack} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MyUserProfile() {
    const userName = "Nombre Apellido1 Apellido2";
    const userRol = "Rol 1";

    return(
        <>
            <Container className="d-flex justify-content-between align-items-center">
                <Stack direction="horizontal" gap={2}>
                    <Stack gap={1} className="d-none d-md-block">
                        <h5 className="mb-0 text-nowrap">{userName}</h5>
                        <p className="mb-0 text-end">{userRol}</p>
                    </Stack>
                    <Link to="perfil">
                        <img
                            src="src\assets\Sample_User_Icon.png"
                            alt="Imagen de perfil de usuario"
                            width={50}
                            height={50}
                            className="rounded-circle"
                        />
                    </Link>
                </Stack>
            </Container>
        </>
    );
}
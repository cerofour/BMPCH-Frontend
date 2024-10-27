import {Container, Stack} from "react-bootstrap";

export default function MyUserProfile() {
    const userName = "Nombre Apellido1 Apellido2";
    const userRol = "Rol 1";

    return(
        <>
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Stack gap={1}>
                    <h5 className="mb-0">{userName}</h5>
                    <p className="mb-0 text-end">{userRol}</p>
                </Stack>
                <img
                    src="src\assets\Sample_User_Icon.png"
                    alt="Imagen de perfil de usuario"
                    width={50}
                    height={50}
                />
            </Container>
        </>
    );
}
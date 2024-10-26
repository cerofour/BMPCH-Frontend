import { Button } from "react-bootstrap";

export default function MyEditButton() {
    return (
        <>
            <Button variant="outline-primary">
                <img
                    src="src\assets\Edit_Notepad_Icon.svg.png"
                    alt="Boton editar"
                    width={20}
                    height={20}
                    style={{
                        filter: 'invert(18%) sepia(100%) saturate(1019%) hue-rotate(192deg) brightness(95%) contrast(95%)',
                        margin: '-20px -5px -11px -5px'
                    }}
                />
            </Button>{' '}
        </>
    );
}
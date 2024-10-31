import { FormEvent } from "react";
import { Button } from "react-bootstrap";

interface MyDeleteButtonProps {
    onEdit: (e: FormEvent) => void;
}

export default function MyEditButton({onEdit}: MyDeleteButtonProps) {
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
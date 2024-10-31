import { FormEvent } from "react";
import { Button } from "react-bootstrap";

interface MyDeleteButtonProps {
    onDelete: (e: FormEvent) => void;
}

export default function MyDeleteButton({ onDelete }: MyDeleteButtonProps) {
    return (
        <>
            <Button variant="outline-danger" onClick={onDelete}>
                <img
                    src="src\assets\X_Icon.png"
                    alt="Boton borrar"
                    width={20}
                    height={20}
                    style={{
                        filter: 'invert(15%) sepia(100%) saturate(5000%) hue-rotate(-10deg) brightness(90%) contrast(110%)',
                        margin: '-20px -5px -15px -5px'
                    }}
                />
            </Button>{' '}
        </>
    );
}
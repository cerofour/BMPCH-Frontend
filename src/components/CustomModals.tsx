import { Modal, Button } from "react-bootstrap";

type CustomModalProps = {
	title: string;
	form: ({ setShow}: any) => JSX.Element;
	show: any;
	setShow: any;
	reload?: boolean;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>;
	otherProps?: any;
};

type ConfirmationModalProps = {
	show: boolean;
	onConfirm: () => void;
	onClose: () => void;
	message: string;
};

export function CustomModal({ title, form, show, setShow, reload, setReload, otherProps }: CustomModalProps) {
	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{reload && setReload
					? form({ show: show, setShow: setShow, reload: reload, setReload: setReload, ...otherProps})
					: form({ show: show, setShow: setShow, ...otherProps })}
			</Modal.Body>
		</Modal>
	);
}

export function ConfirmationModal({ show, onConfirm, onClose, message }: ConfirmationModalProps) {
	return (
		<Modal show={show} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirmación</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					No
				</Button>
				<Button variant="danger" onClick={onConfirm}>
					Sí
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

import { Form, Button } from "react-bootstrap";

export default function Login() {
	return (
		<>
			<div className="login-form-container">
				<h1>Biblioteca Municipal de Chiclayo</h1>
				<div className="d-flex justify-content-center align-items-start">
					<LoginForm></LoginForm>
				</div>
			</div>
		</>
	);
}

function LoginForm() {
	return (
		<Form>
			<Form.Group className="mb-3" controlId="formDocument">
				<Form.Label></Form.Label>
				<Form.Control type="text" placeholder="DNI/CE" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formPassword">
				<Form.Label></Form.Label>
				<Form.Control type="password" placeholder="Contraseña" />
			</Form.Group>
			<Button onClick={(e) => e.preventDefault()} variant="primary" type="submit">
				Ingresar
			</Button>
		</Form>
	);
}

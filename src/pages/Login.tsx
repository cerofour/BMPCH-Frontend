import { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { sendLoginCredentials, UserLogin } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";

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
	const { setToken } = useAuth();

	const [document, setDocument] = useState("");
	const [psk, setPsk] = useState("");

	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	const loginRequest = useMutation({
		mutationFn: sendLoginCredentials,
		onSuccess: (data) => {
			setToken(data.token);
			navigate(from, { replace: true });
		},
	});

	const navigate = useNavigate();

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();
		const request: UserLogin = { document, psk };
		loginRequest.mutate(request);
	};

	return (
		<>
			<Form>
				<Form.Group className="mb-3" controlId="formDocument">
					<Form.Label></Form.Label>
					<Form.Control onChange={(e) => setDocument(e.target.value)} type="text" placeholder="DNI/CE" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPassword">
					<Form.Label></Form.Label>
					<Form.Control onChange={(e) => setPsk(e.target.value)} type="password" placeholder="Contraseña" />
				</Form.Group>
				<Button onClick={handleLogin} variant="primary" type="submit">
					Ingresar
				</Button>
			</Form>
		</>
	);
}

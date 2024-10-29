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
				<div className="d-flex justify-content-center align-items-center">
					<LoginForm/>
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

	const from = location.state?.from?.pathname || "/catalogo";

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
			<div style={{backgroundColor: '#fff', padding: '20px'}}>
				<div style={{textAlign: 'center'}}>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png/1200px-Escudo_de_Armas_la_Ciudad_de_Chiclayo.png"
						alt="Escudo de armas de la ciudad de Chiclayo"
						style={{width: '100px', height: '100px'}}
					/>
					<div style={{textAlign: 'center', display: 'flex', maxWidth: '300px'}}>
						<h4>Municipalidad Provincial de Chiclayo</h4>
					</div>
					<p>Sistema de Biblioteca</p>
				</div>
				<Form>
					<Form.Group className="mb-1" controlId="formDocument">
						<Form.Label></Form.Label>
						<Form.Control onChange={(e) => setDocument(e.target.value)} type="text" placeholder="DNI/CE" />
					</Form.Group>

					<Form.Group className="mb-2" controlId="formPassword">
						<Form.Label></Form.Label>
						<Form.Control onChange={(e) => setPsk(e.target.value)} type="password" placeholder="Contraseña" />
					</Form.Group>
					<div className="mb-3 text-left">
						<a href="ayuda" rel="noopener noreferrer" style={{ color: '#1695a9' }}>
							¿Cómo registrarme?
						</a>
					</div>
					<Button
						onClick={handleLogin}
						variant="primary"
						type="submit"
						className="w-100"
						style={{ backgroundColor: '#1695a9', borderColor: '#1695a9' }}
					>
						Ingresar
					</Button>
				</Form>
			</div>
		</>
	);
}

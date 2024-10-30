import { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { sendLoginCredentials, UserLogin } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
	const [loginStatus, setLoginStatus] = useState(<></>);

	return (
		<>
			<Container
				fluid
				className="d-flex align-items-center justify-content-center min-vh-100"
				style={{ backgroundColor: "#0d6efd" }}
			>
				<Row>
					<Col>
						<Card className="p-4" style={{ width: "22rem", borderRadius: "12px" }}>
							<Card.Body>
								<div className="text-center mb-3">
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png/1200px-Escudo_de_Armas_la_Ciudad_de_Chiclayo.png"
										alt="Logo de la Municipalidad Provincial de Chiclayo"
										width={40}
										height={40}
									/>

									<Card.Title className="fw-bold">Municipalidad Provincial de Chiclayo</Card.Title>
									<Card.Subtitle className="mb-4 text-muted">Sistema de Biblioteca</Card.Subtitle>
								</div>
								<LoginForm setLoginStatus={setLoginStatus}></LoginForm>

								<div className="text-center mt-3">
									{loginStatus}
									<br></br>
									<a href="#" className="text-muted">
										¿Cómo registrarme?
									</a>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

function LoginForm({ setLoginStatus }: any) {
	const { setToken } = useAuth();

	const [document, setDocument] = useState("");
	const [psk, setPsk] = useState("");

	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	const loginRequest = useMutation({
		mutationFn: sendLoginCredentials,
		onSuccess: (data) => {
			setToken(data.token);
			setLoginStatus(<Alert variant="success">Login Completado!</Alert>);
			navigate(from, { replace: true });
		},
		onError(error) {
			// really bad way to check for an error
			if (error.message.endsWith("401")) setLoginStatus(<Alert variant="danger">Credenciales invalidas</Alert>);
			else setLoginStatus(<Alert variant="danger">Error desconocido</Alert>);
		},
	});

	const navigate = useNavigate();

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();
		const request: UserLogin = { document, psk };
		loginRequest.mutate(request);
	};

	return (
		<Form onSubmit={handleLogin}>
			<Form.Group className="mb-3" controlId="formDNI">
				<Form.Label>Ingrese su DNI</Form.Label>
				<Form.Control onChange={(e) => setDocument(e.target.value)} type="text" placeholder="Ingrese su DNI" />
			</Form.Group>

			<Form.Group className="mb-4" controlId="formPassword">
				<Form.Label>Ingrese contraseña</Form.Label>
				<Form.Control
					onChange={(e) => setPsk(e.target.value)}
					type="password"
					placeholder="Ingrese su contraseña"
				/>
			</Form.Group>

			<Button variant="primary" type="submit" className="w-100">
				Ingresar
			</Button>
		</Form>
	);
}

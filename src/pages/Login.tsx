import { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { sendLoginCredentials } from "../api/api";
import { UserLogin } from "../api/types";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { BootstrapIcons, ReactIcons } from "../components/Icon";

export default function Login() {
  const [loginStatus, setLoginStatus] = useState(<></>);

  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center min-vh-100"
      >
        <Row>
          <Col>
            <Card className="p-4" style={{ width: "22rem" }}>
              <Card.Body>
                <div className="text-center mb-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Escudo_de_Armas_la_Ciudad_de_Chiclayo.png/1200px-Escudo_de_Armas_la_Ciudad_de_Chiclayo.png"
                    alt="Logo de la Municipalidad Provincial de Chiclayo"
                    width={120}
                    height={120}
                  />

                  <Card.Title className="fw-bold">
                    MUNICIPALIDAD PROVINCIAL DE CHICLAYO
                  </Card.Title>
                  <Card.Subtitle className="mb-4 text-muted">
                    Sistema de Biblioteca
                  </Card.Subtitle>
                </div>
                <LoginForm setLoginStatus={setLoginStatus}></LoginForm>

                <div className="mt-0">
                  {loginStatus}
                  <br></br>
                  <a href="#" style={{ color: "#1695a9" }}>
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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const loginRequest = useMutation({
    mutationFn: sendLoginCredentials,
    onSuccess: (data) => {
      setToken(data.token);
      setLoginStatus(<Alert variant="success">Login Completado!</Alert>);
      setIsLoading(false);
      navigate(from, { replace: true });
    },
    onError(error) {
      // really bad way to check for an error
      setIsLoading(false);
      if (error.message.endsWith("401"))
        setLoginStatus(<Alert variant="danger">Credenciales invalidas</Alert>);
      else setLoginStatus(<Alert variant="danger">Error desconocido</Alert>);
    },
  });

  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const request: UserLogin = { document, psk };
    loginRequest.mutate(request);
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formDNI">
        {/* <Form.Label>Ingrese su DNI</Form.Label> */}
        <Form.Control
          onChange={(e) => setDocument(e.target.value)}
          type="text"
          placeholder="Ingrese su DNI"
          required
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formPassword">
        {/* <Form.Label>Ingrese contraseña</Form.Label> */}
        <InputGroup>
          <Form.Control
            onChange={(e) => setPsk(e.target.value)}
            type={showPassword ? "text" : "password"} // Alterna el tipo de input
            placeholder="Ingrese su contraseña"
            required
          />
          <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
            {showPassword ? <BootstrapIcons iconName="EyeSlash" size={20} /> : <BootstrapIcons iconName="Eye" size={20} />} 
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100"
        style={{
          backgroundColor: "#1695a9",
          borderColor: "#1695a9",
          borderRadius: "1px",
        }}
        disabled={isLoading}
      >
        {(isLoading ? <Spinner animation="border" variant="light" /> : "Ingresar")}
      </Button>
    </Form>
  );
}

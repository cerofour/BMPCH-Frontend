import { Container, Row, Col, Button } from "react-bootstrap";
import CustomCarousel from "../components/CustomCarousel";

function HomePage() {
	const images = [
		{
			src: "https://tubiblioteca.utp.edu.pe/opac-tmpl/skyblue/images/carousel-01.png",
			alt: "Imagen1",
			title: "Imagen1",
			subcontent: "prueba de imagen 1"
		},
		{
			src: "https://tubiblioteca.utp.edu.pe/opac-tmpl/skyblue/images/carousel-02.png",
			alt: "Imagen2",
			title: "Imagen2",
			subcontent: "prueba de imagen 2"
		},
		{
			src: "https://tubiblioteca.utp.edu.pe/opac-tmpl/skyblue/images/carousel-02.png",
			alt: "Imagen2",
			title: "Imagen2",
			subcontent: "prueba de imagen 2"
		},
	];

	return (
		<>
		<CustomCarousel elements={images} interval={1000} theme="ligth" />
		<Container fluid className="d-flex align-items-center justify-content-center">
			<Row className="text-center">

				<Col>
					<h1 className="fw-bold" style={{ fontSize: "2.5rem", marginTop: "30px" }}>
						Biblioteca Municipal
					</h1>
					<p className="lead mb-4">El mejor lugar para encontrar tus libros favoritos.</p>
					<Row className="justify-content-center">
						<Col xs="auto" className="mb-2">
							<Button
								href="/catalogo"
								variant="info"
								className="px-4 py-2"
								style={{ borderRadius: "8px", fontWeight: "bold" }}
							>
								Ir al Catálogo
							</Button>
						</Col>
						<Col xs="auto" className="mb-2">
							<Button
								href="/perfil"
								variant="info"
								className="px-4 py-2"
								style={{ borderRadius: "8px", fontWeight: "bold" }}
							>
								Ver Perfil
							</Button>
						</Col>
					</Row>
					<p className="text-muted mt-4">
						Explora nuestro catálogo o accede a tu perfil para gestionar tus préstamos.
					</p>
				</Col>
			</Row>
		</Container>
		</>
	);
}

export default HomePage;

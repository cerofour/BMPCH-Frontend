import { Container, Row, Col, Button } from "react-bootstrap";

function HomePage() {
	return (
		<>
			<Container fluid className="my-4">
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
									variant="primary"
									className="px-4 py-2"
									style={{ borderRadius: "8px", fontWeight: "bold" }}
								>
									Ir al Catálogo
								</Button>
							</Col>
							<Col xs="auto" className="mb-2">
								<Button
									href="/perfil"
									variant="outline-secondary"
									className="px-4 py-2"
									style={{ borderRadius: "8px", fontWeight: "bold" }}
								>
									Ver Perfil
								</Button>
							</Col>
						</Row>
						<p className="text-muted my-4">
							Explora nuestro catálogo o accede a tu perfil para gestionar tus préstamos.
						</p>
					</Col>
				</Row>
				<Row className="homepage-band bg-light">
					<Col md={4} className="px-3">
						<h5>Salas de Lectura</h5>
						<p>
							En nuestras instalaciones, te invitamos a disfrutar de un espacio acogedor ideal para
							explorar la riqueza de la literatura peruana y el fascinante mundo de la ciencia. Sumérgete
							en relatos que reflejan nuestra cultura o descubre libros que expanden tu conocimiento, todo
							en un entorno tranquilo y lleno de inspiración.
						</p>
					</Col>
					<Col md={4} className="px-3">
						<h5>Más de 10000 títulos</h5>
						<p>
							Contamos con más de 10,000 libros a tu disposición, desde clásicos de la literatura hasta
							obras científicas y de investigación. Explora una amplia variedad de temas y géneros en un
							espacio pensado para el aprendizaje y la inspiración. ¡Tu próxima lectura te espera!
						</p>
					</Col>
					<Col md={4} className="px-3">
						<h5>Adquiere tu carnet</h5>
						<p>
							Obtén tu carnet de biblioteca y disfruta de grandes beneficios: acceso a préstamos de libros
							en sala, una amplia colección para explorar, y la posibilidad de consultar nuestra
							plataforma online desde cualquier lugar. ¡La puerta a un mundo de conocimiento está a tu
							alcance!
						</p>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default HomePage;

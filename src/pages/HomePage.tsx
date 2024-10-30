import { Container, Row, Col } from "react-bootstrap";

function HomePage() {
  return (
    <Container fluid className="p-4">
      <Row className="text-center mb-4">
        <Col>
          <h1>
            <b>Bienvenido a la Biblioteca</b>
          </h1>
          <p>Explora una vasta colección de libros, recursos y más.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

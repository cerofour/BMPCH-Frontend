import { Row, Col, Form, FormControl, Button } from "react-bootstrap";

type SearchBarProps = {
	placeholder: string;
	buttonText: string;
};

export function SearchBar(p: SearchBarProps) {
	return (
		<Row className="mb-4">
			<Col>
				<Form className="d-flex">
					<FormControl type="text" placeholder={p.placeholder} />
				</Form>
			</Col>
			<Col>
				<Button variant="primary">{p.buttonText}</Button>
			</Col>
		</Row>
	);
}

import { FormEvent, ChangeEvent } from "react";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";

type SearchBarProps = {
	placeholder: string;
	buttonText: string;
	onClick?: (e: FormEvent) => void;
	onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar(p: SearchBarProps) {
	return (
		<Form onSubmit={p.onClick}>
			<Row className="mb-4">
				<Col xs={12} sm={8} md={10}>
					<FormControl onChange={p.onChangeInput} type="text" placeholder={p.placeholder} />
				</Col>
				<Col xs={12} sm={4} md={2}>
					<Button type="submit" onClick={p.onClick} variant="outline-secondary" className="w-100">
						{p.buttonText}
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

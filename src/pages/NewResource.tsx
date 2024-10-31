import { Container } from "react-bootstrap";

import { NewTextForm } from "../components/AdminTables";

export default function NewResource() {
	return (
		<>
			<Container>
				<h1 className="my-3">
					<b>Crear Nuevo Texto</b>
				</h1>
				<NewTextForm show={false} setShow={(_: boolean) => {}}></NewTextForm>
			</Container>
		</>
	);
}

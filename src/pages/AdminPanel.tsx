import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { NewTextModal, TextsTable, UsersTable } from "../components/AdminTables";
import { Container, Button } from "react-bootstrap";

import { useState } from "react";

function CRUDTabs() {
	const [showModal, setShowModal] = useState(false);

	return (
		<Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
			<Tab eventKey="users" title="Usuarios">
				<Container>
					<UsersTable></UsersTable>
				</Container>
			</Tab>
			<Tab eventKey="texts" title="Textos">
				<Container>
					<div className="d-flex">
						<h2>Administrar textos</h2>
						<Button onClick={() => setShowModal(true)}>Nuevo texto</Button>
						<NewTextModal enabled={showModal} setEnabled={setShowModal}></NewTextModal>
					</div>
					<TextsTable></TextsTable>
				</Container>
			</Tab>
			<Tab eventKey="contact" title="Contact" disabled>
				Tab content for Contact
			</Tab>
		</Tabs>
	);
}

export default function AdminPanel() {
	return (
		<>
			<h1>Panel de Administrador</h1>
			<CRUDTabs></CRUDTabs>
		</>
	);
}

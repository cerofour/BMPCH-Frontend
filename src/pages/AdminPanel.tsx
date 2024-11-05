import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Card, CardBody } from "react-bootstrap";

import { NewTextForm, TextsTable, UsersTable } from "../components/AdminTables";
import { CustomModal } from "../components/CustomModals";
import { Container, Button } from "react-bootstrap";

import { useState } from "react";

type PanelCardProps = {
	title: string;
	showThisModal: boolean;
	setShowThisModal: (x: boolean) => void;
	children: any;
};

function PanelCard({ children }: any) {
	return (
		<Card>
			<CardBody>{children}</CardBody>
		</Card>
	);
}

function CRUDTabs() {
	const [showNewTextModal, setShowNewTextModal] = useState(false);
	const [showNewUserModal, setShowNewUserModal] = useState(false);

	const [reloadUsers, setReloadUsers] = useState(false);
	const [reloadTexts, setReloadTexts] = useState(false);

	return (
		<Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
			<Tab eventKey="users" title="Usuarios">
				<PanelCard>
					<div className="my-2 d-flex justify-content-between">
						<h2>
							<b>Administrar usuarios</b>
						</h2>
						<Button onClick={() => setShowNewUserModal(true)}>Agregar usuario</Button>
					</div>

					<UsersTable></UsersTable>
				</PanelCard>
			</Tab>
			<Tab eventKey="texts" title="Textos">
				<PanelCard>
					<div className="my-2 d-flex justify-content-between">
						<h2>
							<b>Administrar textos</b>
						</h2>
						<Button onClick={() => setShowNewTextModal(true)}>Agregar elemento</Button>
					</div>
					<CustomModal 
						show={showNewTextModal} 
						setShow={setShowNewTextModal} 
						title="Añadir nuevo texto"
						form={NewTextForm}
						reload={reloadTexts}
						setReload={setReloadTexts}
					></CustomModal>
					<TextsTable reload={reloadTexts} setReload={setReloadTexts}></TextsTable>
				</PanelCard>
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
			<div className="my-4">
				<h1>
					<b>Panel de Administrador</b>
				</h1>
			</div>
			<CRUDTabs></CRUDTabs>
		</>
	);
}

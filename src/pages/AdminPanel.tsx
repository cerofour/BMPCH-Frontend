import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Card, CardBody, Container, Toast, ToastContainer } from "react-bootstrap";

import { TextsTable, UsersTable, CustomersTable, AuthorsTable } from "../components/AdminTables";
import { CustomModal } from "../components/CustomModals";
import { Button } from "react-bootstrap";
import { NewTextForm, NewCustomerForm, NewAuthorForm } from "../components/Form";

import { NewUserForm } from "../components/form/NewUserForm";

import CRUDContext from "../hooks/CRUDContext";
import { CRUDContextType } from "../hooks/CRUDContext";

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
	const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
	const [showNewAuthorModal, setShowNewAuthorModal] = useState(false);

	const [reloadUsers, setReloadUsers] = useState(false);
	const [reloadTexts, setReloadTexts] = useState(false);
	const [reloadCustomers, setReloadCustomers] = useState(false);
	const [reloadAuthors, setReloadAuthors] = useState(false);

	const [userToast, setUserToast] = useState(false);
	const [userToastVariant, setUserToastVariant] = useState<"success" | "danger">("danger");
	const [userToastMessage, setUserToastMessage] = useState<string>("");

	const toggleUserToast = () => setUserToast(!userToast);

	const crudContext: CRUDContextType = {
		userCreationSuccess() {
			toggleUserToast();
			setUserToastMessage("El usuario se creó exitosamente");
			setUserToastVariant("success");
		},
		userCreationFailure(_) {
			toggleUserToast();
			setUserToastMessage("No se pudo crear el usuario");
			setUserToastVariant("danger");
		},
	};

	return (
		<CRUDContext.Provider value={crudContext}>
			<Container>
				<ToastContainer position="bottom-end" className="p-3">
					<Toast
						show={userToast}
						onClose={() => toggleUserToast()}
						bg={userToastVariant}
						delay={3000}
						autohide
					>
						<Toast.Header>
							<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
							<strong className="me-auto">Creación de usuarios</strong>
						</Toast.Header>
						<Toast.Body>{userToastMessage}</Toast.Body>
					</Toast>
				</ToastContainer>
				<Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
					<Tab eventKey="users" title="Usuarios">
						<PanelCard>
							<div className="my-2 d-flex justify-content-between">
								<h2>
									<b>Administrar usuarios</b>
								</h2>
								<Button onClick={() => setShowNewUserModal(true)}>Agregar usuario</Button>
							</div>

							<CustomModal
								show={showNewUserModal}
								setShow={setShowNewUserModal}
								title="Añadir nuevo usuario"
								form={NewUserForm}
								reload={reloadUsers}
								setReload={setReloadUsers}
							></CustomModal>

							<UsersTable></UsersTable>
						</PanelCard>
					</Tab>
					<Tab eventKey="texts" title="Textos">
						<PanelCard>
							<div className="my-2 d-flex justify-content-between">
								<h2>
									<b>Administrar textos</b>
								</h2>
								<Button onClick={() => setShowNewTextModal(true)}>Agregar texto</Button>
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
					<Tab eventKey="customers" title="Clientes">
						<PanelCard>
							<div className="my-2 d-flex justify-content-between">
								<h2>
									<b>Administrar Clientes</b>
								</h2>
								<Button onClick={() => setShowNewCustomerModal(true)}>Agregar cliente</Button>
							</div>
							<CustomModal
								show={showNewCustomerModal}
								setShow={setShowNewCustomerModal}
								title="Añadir nuevo cliente"
								form={NewCustomerForm}
								reload={reloadCustomers}
								setReload={setReloadCustomers}
							></CustomModal>
							<CustomersTable reload={reloadCustomers} setReload={setReloadCustomers}></CustomersTable>
						</PanelCard>
					</Tab>
					<Tab eventKey="authors" title="Autores">
						<PanelCard>
							<div className="my-2 d-flex justify-content-between">
								<h2>
									<b>Administrar Autores</b>
								</h2>
								<Button onClick={() => setShowNewAuthorModal(true)}>Agregar autor</Button>
							</div>
							<CustomModal
								show={showNewAuthorModal}
								setShow={setShowNewAuthorModal}
								title="Añadir nuevo autor"
								form={NewAuthorForm}
								reload={reloadAuthors}
								setReload={setReloadAuthors}
							></CustomModal>
							<AuthorsTable reload={reloadAuthors} setReload={setReloadAuthors}></AuthorsTable>
						</PanelCard>
					</Tab>
				</Tabs>
			</Container>
		</CRUDContext.Provider>
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

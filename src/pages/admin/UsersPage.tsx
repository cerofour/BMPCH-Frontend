import { useContext, useState } from "react";

import { Container, ToastContainer, Toast, Tabs } from "react-bootstrap";

import CRUDContext from "../../hooks/CRUDContext";

import { TabsData, generateAdminTabs } from "../../components/Utils";
import { UsersTable } from "../../components/AdminTables";
import { NewUserForm } from "../../components/form/NewUserForm";

export default function UsersPage() {
	const [showNewUserModal, setShowNewUserModal] = useState(false);

	const [reloadUsers, setReloadUsers] = useState(false);
	const context = useContext(CRUDContext);

	const tabsData: TabsData[] = [
		{
			tabKey: "users",
			tabName: "Usuarios",
			tabTitle: "Administrar usuarios",
			buttonTitle: "Agregar usuario",
			showModal: showNewUserModal,
			setShowModal: setShowNewUserModal,
			modalTitle: "Añadir nuevo usuario",
			reload: reloadUsers,
			setReload: setReloadUsers,
			tabForm: NewUserForm, // JSX.Element
			searchBarPlaceholder: "Buscar usuario por DNI, nombre o apellidos",
			tableGenerator: (filterFn: ((item: string) => boolean) | undefined) => <UsersTable filterFn={filterFn} />, // JSX.Element
		},
	];

	return (
		<>
			<div className="my-4">
				<h1>Módulo de Administración de Usuarios</h1>
			</div>
			<Container>
				<ToastContainer position="bottom-end" className="p-3">
					<Toast
						show={context?.entityCreationToast}
						onClose={() => context?.toggleToast()}
						bg={context?.entityToastData.variant}
						delay={3000}
						autohide
					>
						<Toast.Header>
							<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
							<strong className="me-auto">Módulo de Usuarios</strong>
						</Toast.Header>
						<Toast.Body>{context?.entityToastData.msg}</Toast.Body>
					</Toast>
				</ToastContainer>
				<Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
					{generateAdminTabs(tabsData)}
				</Tabs>
			</Container>
		</>
	);
}

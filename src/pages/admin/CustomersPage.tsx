import { useContext, useState } from "react";

import { Container, ToastContainer, Toast, Tabs } from "react-bootstrap";

import CRUDContext from "../../hooks/CRUDContext";

import { NewCustomerForm } from "../../components/form/NewCustomersForm";
import { CustomersTable } from "../../components/AdminTables";
import { generateAdminTabs, TabsData } from "../../components/Utils";

export default function CustomersPage() {
	const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

	const [reloadCustomers, setReloadCustomers] = useState(false);

	const context = useContext(CRUDContext);

	const tabsData: TabsData[] = [
		{
			tabKey: "customers",
			tabName: "Clientes",
			tabTitle: "Administrar clientes",
			buttonTitle: "Agregar cliente",
			showModal: showNewCustomerModal,
			setShowModal: setShowNewCustomerModal,
			modalTitle: "Añadir nuevo cliente",
			reload: reloadCustomers,
			setReload: setReloadCustomers,
			tabForm: NewCustomerForm, // JSX.Element
			table: <CustomersTable reload={reloadCustomers} setReload={setReloadCustomers} />, // JSX.Element
		},
	];

	return (
		<>
			<div className="my-4">
				<h1>Módulo de Administración de Clientes</h1>
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
							<strong className="me-auto">Módulo de Clientes</strong>
						</Toast.Header>
						<Toast.Body>{context?.entityToastData.msg}</Toast.Body>
					</Toast>
				</ToastContainer>
				<Tabs defaultActiveKey="customers" id="uncontrolled-tab-example" className="mb-3">
					{generateAdminTabs(tabsData)}
				</Tabs>
			</Container>
		</>
	);
}

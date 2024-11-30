import { useContext, useState } from "react";

import { Container, ToastContainer, Toast, Tabs } from "react-bootstrap";

import CRUDContext from "../../hooks/CRUDContext";

import { NewLoanForm } from "../../components/form/NewLoanForm";
import { LoansTable } from "../../components/AdminTables";
import { generateAdminTabs, TabsData } from "../../components/Utils";

export default function LoansPage() {
	const [showNewLoanModal, setShowNewLoanModal] = useState(false);

	const [reloadLoans, setReloadLoans] = useState(false);

	const context = useContext(CRUDContext);

	const tabsData: TabsData[] = [
		{
			tabKey: "loans",
			tabName: "Préstamos",
			tabTitle: "Administrar préstamos",
			buttonTitle: "Realizar préstamo",
			showModal: showNewLoanModal,
			setShowModal: setShowNewLoanModal,
			modalTitle: "Realizar Préstamo",
			reload: reloadLoans,
			setReload: setReloadLoans,
			tabForm: NewLoanForm, // JSX.Element
			table: <LoansTable />, // JSX.Element
		},
	];

	return (
		<>
			<div className="my-4">
				<h1>Módulo de Administración de Préstamos</h1>
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
							<strong className="me-auto">Módulo de Préstamos</strong>
						</Toast.Header>
						<Toast.Body>{context?.entityToastData.msg}</Toast.Body>
					</Toast>
				</ToastContainer>
				<Tabs defaultActiveKey="loans" id="uncontrolled-tab-example" className="mb-3">
					{generateAdminTabs(tabsData)}
				</Tabs>
			</Container>
		</>
	);
}

import { useContext, useState } from "react";

import { Container, ToastContainer, Toast, Tabs } from "react-bootstrap";

import { TextsTable, AuthorsTable } from "../../components/AdminTables";
import { NewTextForm } from "../../components/form/NewTextForm";
import { NewAuthorForm } from "../../components/form/NewAuthorForm";

import { generateAdminTabs, TabsData } from "../../components/Utils";

import CRUDContext from "../../hooks/CRUDContext";
import { EditorialsTable } from "../../components/tables/EditorialsTable";
import NewEditorialForm from "../../components/form/NewEditorialForm";

export default function TextsPage() {
	const [showNewTextModal, setShowNewTextModal] = useState(false);
	const [showNewAuthorModal, setShowNewAuthorModal] = useState(false);
	const [showNewEditorialModal, setShowNewEditorialModal] = useState(false);

	const [reloadTexts, setReloadTexts] = useState(false);
	const [reloadAuthors, setReloadAuthors] = useState(false);
	const [reloadEditorials, setReloadEditorials] = useState(false);

	const context = useContext(CRUDContext);

	const tabsData: TabsData[] = [
		{
			tabKey: "texts",
			tabName: "Textos",
			tabTitle: "Administrar textos",
			useButton: true,
			buttonTitle: "Agregar texto",
			showModal: showNewTextModal,
			setShowModal: setShowNewTextModal,
			modalTitle: "Añadir nuevo texto",
			reload: reloadTexts,
			setReload: setReloadTexts,
			tabForm: NewTextForm, // JSX.Element
			searchBarPlaceholder: "Buscar libros",
			tableGenerator: (filterFn: ((item: string) => boolean) | undefined) => (
				<TextsTable reload={reloadTexts} setReload={setReloadTexts} filterFn={filterFn} />
			), // JSX.Element
		},
		{
			tabKey: "authors",
			tabName: "Autores",
			tabTitle: "Administrar autores",
			useButton: true,
			buttonTitle: "Agregar autor",
			reload: reloadAuthors,
			setReload: setReloadAuthors,
			showModal: showNewAuthorModal,
			setShowModal: setShowNewAuthorModal,
			modalTitle: "Añadir nuevo autor",
			tabForm: NewAuthorForm, // JSX.Element
			searchBarPlaceholder: "Buscar autores",
			tableGenerator: (filterFn: ((item: string) => boolean) | undefined) => (
				<AuthorsTable reload={reloadAuthors} setReload={setReloadAuthors} filterFn={filterFn} />
			), // JSX.Element
		},
		{
			tabKey: "editorials",
			tabName: "Editoriales",
			tabTitle: "Administrar editoriales",
			useButton: true,
			buttonTitle: "Agregar editorial",
			reload: reloadEditorials,
			setReload: setReloadEditorials,
			showModal: showNewEditorialModal,
			setShowModal: setShowNewEditorialModal,
			modalTitle: "Añadir nueva editorial",
			tabForm: NewEditorialForm, // JSX.Element
			searchBarPlaceholder: "Buscar editorial",
			tableGenerator: (filterFn: ((item: string) => boolean) | undefined) => (
				<EditorialsTable reload={reloadEditorials} setReload={setReloadEditorials} filterFn={filterFn} />
			), // JSX.Element
		},
	];

	return (
		<>
			<div className="my-4">
				<h1>Módulo de Administración de Textos</h1>
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
							<strong className="me-auto">Módulo de Textos</strong>
						</Toast.Header>
						<Toast.Body>{context?.entityToastData.msg}</Toast.Body>
					</Toast>
				</ToastContainer>
				<Tabs>{generateAdminTabs(tabsData)}</Tabs>
			</Container>
		</>
	);
}

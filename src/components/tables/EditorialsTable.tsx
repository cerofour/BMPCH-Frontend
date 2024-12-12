import { useContext, useState } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";

import { Button, ButtonGroup, Table } from "react-bootstrap";

import { getAllEditorials, deleteEditorial } from "../../api/api";
import { EditorialAPIObject } from "../../api/types";

import { buildTableContent } from "../Utils";

import { ConfirmationModal } from "../CustomModals";
import TableProps from "./TableProps";
import CRUDContext from "../../hooks/CRUDContext";

export function EditorialsTable({ filterFn }: TableProps) {
	const {
		isLoading,
		isError,
		data: editorials,
	} = useQuery<EditorialAPIObject[], Error>({
		queryKey: ["getAllEditorials"],
		queryFn: getAllEditorials,
	});

	const [showModal, setShowModal] = useState(false);
	const [editorialNameToDelete, setEditorialNameToDelete] = useState<string | null>(null);
	const context = useContext(CRUDContext);

	const deleteEditorialMutation = useMutation({
		mutationFn: deleteEditorial,
		onSuccess() {
			context?.setToastData("Se ha eliminado la editorial.", "success");
			context?.toggleToast();
			setShowModal(false);
			setEditorialNameToDelete(null);
		},
		onError(error) {
			console.log(error);
			context?.setToastData("No se pudo eliminar.", "danger");
			context?.toggleToast();
		},
	});

	const handleShowModal = (name: string) => {
		setEditorialNameToDelete(name);
		setShowModal(true);
	};

	const handleCloseModal = () => {};

	const handleConfirmDelete = () => {
		if (editorialNameToDelete === null) return;
		deleteEditorialMutation.mutate(editorialNameToDelete);
	};

	const tableContent: any = buildTableContent(
		9,
		isLoading,
		isError,
		editorials,
		(editorial: EditorialAPIObject) => (
			<tr key={editorial.id}>
				<td>{editorial.id}</td>
				<td>{editorial.name}</td>
				<td>
					<ButtonGroup aria-label="Basic example">
						<Button variant="secondary">Actualizar</Button>
						<Button onClick={() => handleShowModal(editorial.name)} variant="danger">
							Eliminar
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		),
		filterFn,
		(item: EditorialAPIObject) => item.name
	);

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Editorial</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar esta editorial? La eliminación puede no funcionar debido a que esta entidad puede estar relacionada a otras entidades."
			></ConfirmationModal>
		</>
	);
}

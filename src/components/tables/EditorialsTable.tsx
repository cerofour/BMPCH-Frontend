import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Button, ButtonGroup, Table } from "react-bootstrap";

import { getAllEditorials } from "../../api/api";
import { EditorialAPIObject } from "../../api/types";

import { buildTableContent } from "../Utils";

import { ConfirmationModal } from "../CustomModals";
import TableProps from "./TableProps";

export function EditorialsTable({ reload, setReload, filterFn }: TableProps) {
	const {
		isLoading,
		isError,
		data: editorials,
	} = useQuery<EditorialAPIObject[], Error>({
		queryKey: ["getAllEditorials"],
		queryFn: getAllEditorials,
	});

	reload; // yea
	setReload;

	const [showModal, setShowModal] = useState(false);
	const [editorialIdToDelete, setEditorialIdToDelete] = useState<number | null>(null);

	/* TODO: DELETE EDITORIAL 
	const deleteAuthorMutation = useMutation({
		mutationFn: deleteEditorial,
		onSuccess() {
			setReload(true);
		},
	});
	*/

	const handleShowModal = (authorId: number) => {
		setEditorialIdToDelete(authorId);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setEditorialIdToDelete(null);
	};

	const handleConfirmDelete = () => {
		if (editorialIdToDelete === null) return;
		//deleteAuthorMutation.mutate(authorIdToDelete);
		handleCloseModal();
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
						<Button onClick={() => handleShowModal(editorial.id)} variant="danger">
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

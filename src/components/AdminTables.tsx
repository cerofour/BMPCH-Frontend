import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";

import { getAllTexts, getAllUsers, deleteUser, deleteText } from "../api/api";
import { UserAPIObject, TextAPIObject } from "../api/types";
import { ConfirmationModal } from "./CustomModals";
import { firstN } from "./Utils";

function buildTableContent<T extends Object>(
	colspan: number,
	isLoading: boolean,
	isError: boolean,
	data: T[] | undefined,
	mapFn: any
) {
	if (isLoading)
		return (
			<tr>
				<td colSpan={colspan}>Cargando recursos...</td>
			</tr>
		);

	if (isError)
		return (
			<tr>
				<td colSpan={colspan}>Error al cargar recursos.</td>
			</tr>
		);

	console.log(data);

	return data?.map(mapFn);
}

export function TextsTable({ reload, setReload }: any) {
	const {
		isLoading,
		isError,
		data: books,
		refetch,
	} = useQuery<TextAPIObject[], Error>({
		queryKey: ["getAllTexts"],
		queryFn: getAllTexts,
	});

	const [showModal, setShowModal] = useState(false);
	const [bookIdToDelete, setBookIdToDelete] = useState<number | null>(null);

	const deleteTextMutation = useMutation({
		mutationFn: deleteText,
		onSuccess() {
			setReload(true);
		},
	});

	useEffect(() => {
		if (reload) {
			refetch();
			setReload(false);
		}
	}, [reload, refetch]);

	const handleShowModal = (bookId: number) => {
		setBookIdToDelete(bookId);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setBookIdToDelete(null);
	};

	const handleConfirmDelete = () => {
		if (bookIdToDelete === null) return;
		deleteTextMutation.mutate(bookIdToDelete);
		handleCloseModal();
	};

	const tableContent: any = buildTableContent(9, isLoading, isError, books, (book: TextAPIObject) => (
		<tr key={book.id}>
			<td>{book.id}</td>
			<td>{book.title}</td>
			<td>{book.editorial.name}</td>
			<td>{book.type.typename}</td>
			<td>{book.publicationDate.toString()}</td>
			<td>
				<ul>
					{book.authors.map((e) => (
						<li>
							{e.name} {e.plastName} {e.mlastName}
						</li>
					))}
				</ul>
			</td>
			<td>{book.pages}</td>
			<td>{book.edition}</td>
			<td>{book.volume}</td>
			<td>
				<ButtonGroup aria-label="Basic example">
					<Button variant="secondary">Actualizar</Button>
					<Button onClick={() => handleShowModal(book.id)} variant="danger">
						Eliminar
					</Button>
				</ButtonGroup>
			</td>
		</tr>
	));

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Título</th>
						<th>Editorial</th>
						<th>Tipo</th>
						<th>Fecha Publicación</th>
						<th>Autores</th>
						<th>Páginas</th>
						<th>Edición</th>
						<th>Volumen</th>
						<th>Opciones</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este libro?"
			></ConfirmationModal>
		</>
	);
}

export function UsersTable() {
	const { isLoading, isError, data } = useQuery<UserAPIObject[], Error>({
		queryKey: ["getAllUsers"],
		queryFn: getAllUsers,
	});

	const [showModal, setShowModal] = useState(false);
	const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

	const deleteUserMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess() {},
	});

	const handleShowModal = (userId: number) => {
		setUserIdToDelete(userId);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setUserIdToDelete(null);
	};

	const handleConfirmDelete = () => {
		if (userIdToDelete === null) return;
		deleteUserMutation.mutate(userIdToDelete);
		handleCloseModal();
	};

	const tableContent: any = buildTableContent(6, isLoading, isError, data, (user: UserAPIObject) => (
		<tr key={user.userId}>
			<td>{user.userId}</td>
			<td>{user.roleId}</td>
			<td>{user.document}</td>
			<td>{user.name}</td>
			<td>{user.plastName}</td>
			<td>{user.mlastName}</td>
			<td>{user.phoneNumber}</td>
			<td>{user.gender.genderName}</td>
			<td>{firstN(user.psk, 12)}</td>
			<td>
				<ButtonGroup aria-label="Basic example">
					<Button variant="secondary">Actualizar</Button>
					<Button onClick={() => handleShowModal(user.userId)} variant="danger">
						Eliminar
					</Button>
				</ButtonGroup>
			</td>
		</tr>
	));

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Rol</th>
						<th>Documento</th>
						<th>Nombre</th>
						<th>A. Paterno</th>
						<th>A. Materno</th>
						<th>Teléfono</th>
						<th>Género</th>
						<th>PSK</th>
						<th>Operaciones</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este libro?"
			></ConfirmationModal>
		</>
	);
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { getAllTexts, getAllUsers, UserAPIObject, deleteUser, deleteText } from "../api/api";
import { TextAPIObject } from "../api/api";

function firstN(src: string, n: number) {
	return src.slice(0, n) + "...";
}

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

export function TextsTable() {
	const {
		isLoading,
		isError,
		data: books,
	} = useQuery<TextAPIObject[], Error>({
		queryKey: ["getAllTexts"],
		queryFn: getAllTexts,
	});

	const [reload, setReload] = useState(false);

	const deleteTextMutation = useMutation({
		mutationFn: deleteText,
		onSuccess() {
			setReload(true);
		},
	});

	const handleDelete = (e: FormEvent, id: number) => {
		e.preventDefault();
		deleteTextMutation.mutate(id);
	};

	/*
	 */
	const tableContent: any = buildTableContent(9, isLoading, isError, books, (book: TextAPIObject) => (
		<tr key={book.id}>
			<td>{book.id}</td>
			<td>{book.title}</td>
			<td>{book.editorial.name}</td>
			<td>{book.type.typename}</td>
			<td>{book.publicationDate.toString()}</td>
			<td>{book.pages}</td>
			<td>{book.edition}</td>
			<td>{book.volume}</td>
			<td>
				<ButtonGroup aria-label="Basic example">
					<Button variant="secondary">Actualizar</Button>
					<Button onClick={(e) => handleDelete(e, book.id)} variant="danger">
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
						<th>Páginas</th>
						<th>Edición</th>
						<th>Volumen</th>
						<th>Opciones</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
		</>
	);
}

export function UsersTable() {
	const { isLoading, isError, data } = useQuery<UserAPIObject[], Error>({
		queryKey: ["getAllUsers"],
		queryFn: getAllUsers,
	});

	const [reload, setReload] = useState(false);

	const deleteUserMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess() {
			console.log();
			setReload(true);
		},
	});

	const handleDelete = (e: FormEvent, userId: number) => {
		e.preventDefault();
		deleteUserMutation.mutate(userId);
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
					<Button onClick={(e) => handleDelete(e, user.userId)} variant="danger">
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
		</>
	);
}

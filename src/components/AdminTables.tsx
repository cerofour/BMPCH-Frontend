import { useMutation, useQuery } from "@tanstack/react-query";

import { FormEvent, useEffect, useState } from "react";

import { ConfirmationModal } from "./CustomModals";

import { firstN } from "./Utils";

import { Table, Button, ButtonGroup, Form, Dropdown, DropdownButton, Spinner, Container, Alert } from "react-bootstrap";

import {
	getAllTexts,
	getAllUsers,
	getAllEditorials,
	getAllTypes,
	newText,
	deleteUser,
	deleteText,
	getAllAuthors,
} from "../api/api";

import {
	TextDTO,
	EditorialAPIObject,
	TextAPIObject,
	UserAPIObject,
	TextTypeAPIObject,
	AuthorAPIObject,
} from "../api/types";
import MultiSelectWithAutocomplete from "./MultiSelectInput";

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

type CustomDropdownProps<T> = {
	qKey: string[];
	qFn: () => Promise<T[]>;
	getOptionLabel: any;
	setSelectedItem: any;
	mapSelectedValue: (e: any) => string | number;
};

function CustomDropdown<T>({ qKey, qFn, getOptionLabel, setSelectedItem, mapSelectedValue }: CustomDropdownProps<T>) {
	const {
		isLoading,
		isError,
		data: data,
	} = useQuery<T[], Error>({
		queryKey: qKey,
		queryFn: qFn,
	});

	const [dropdownTitle, setDropdownTitle] = useState("Seleccione una opción");

	if (isLoading) return <Spinner animation="border" role="status" />;

	if (isError) return <Alert variant="danger">No se pudo cargar.</Alert>;

	return (
		<DropdownButton variant="outline-secondary" title={dropdownTitle}>
			{data?.map((e: any) => (
				<Dropdown.Item
					key={getOptionLabel(e)}
					onClick={() => {
						setSelectedItem(mapSelectedValue(e));
						setDropdownTitle(getOptionLabel(e));
					}}
				>
					{getOptionLabel(e)}
				</Dropdown.Item>
			))}
		</DropdownButton>
	);
}

export function NewTextForm({ show, setShow, reload, setReload }: any) {
	const [title, setTitle] = useState("");
	const [editorialId, setEditorialId] = useState(0);
	const [typeId, setTypeId] = useState(0);
	const [publicationDate, setPublicationDate] = useState(new Date());
	const [numPages, setPages] = useState(0);
	const [edition, setEdition] = useState(0);
	const [volume, setVolume] = useState(0);
	const [authors, setAuthors] = useState<number[]>([]);

	const mutation = useMutation({
		mutationFn: newText,
		onSuccess: () => {
			setReload(true);
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const requestBody: TextDTO = {
			title,
			editorialId,
			publicationDate,
			typeId,
			edition,
			volume,
			numPages,
			authors,
		};
		setShow(false);
		mutation.mutate(requestBody as TextDTO);
	};

	return (
		<>
			<Container fluid>
				<Form>
					<Form.Group className="mb-3" controlId="formTitulo">
						<Form.Label> Título </Form.Label>
						<Form.Control
							placeholder="Escribe el título del libro"
							onChange={(e) => setTitle(e.target.value)}
							type="text"
						></Form.Control>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formTitulo">
						<Form.Label> Fecha de Publicación</Form.Label>
						<Form.Control
							onChange={(e) => setPublicationDate(new Date(e.target.value))}
							type="date"
						></Form.Control>
					</Form.Group>

					<Container className="d-flex justify-content-between px-0">
						<Form.Group className="mb-3" controlId="formTitulo">
							<Form.Label> Cantidad de Páginas</Form.Label>
							<Form.Control
								onChange={(e) => setPages(parseInt(e.target.value))}
								type="number"
							></Form.Control>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formTitulo">
							<Form.Label> Edición</Form.Label>
							<Form.Control
								onChange={(e) => setEdition(parseInt(e.target.value))}
								type="number"
							></Form.Control>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formTitulo">
							<Form.Label>Volumen</Form.Label>
							<Form.Control
								onChange={(e) => setVolume(parseInt(e.target.value))}
								type="number"
							></Form.Control>
						</Form.Group>
					</Container>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<div className="d-flex justify-content-between">
							<Form.Label>Editorial</Form.Label>
							<CustomDropdown
								qKey={["getAllEditorials"]}
								qFn={getAllEditorials}
								getOptionLabel={(e: EditorialAPIObject) => e.name}
								setSelectedItem={setEditorialId}
								mapSelectedValue={(e: EditorialAPIObject) => e.id}
							></CustomDropdown>
						</div>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<div className="d-flex justify-content-between">
							<Form.Label>Tipo de Texto</Form.Label>
							<CustomDropdown
								qKey={["getAllTypes"]}
								qFn={getAllTypes}
								getOptionLabel={(e: TextTypeAPIObject) => e.typename}
								setSelectedItem={setTypeId}
								mapSelectedValue={(e: TextTypeAPIObject) => e.typeId}
							></CustomDropdown>
						</div>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<div className="d-flex justify-content-between">
							<Form.Label>Seleccionar Autores</Form.Label>
							<MultiSelectWithAutocomplete
								qKey={["getAllAuthors"]}
								qFn={getAllAuthors}
								getOptionLabel={(e: AuthorAPIObject) => `${e.name} ${e.plastName} ${e.mlastName}`}
								getOptionValue={(e: AuthorAPIObject) => e.id}
								setSelected={setAuthors}
							></MultiSelectWithAutocomplete>
						</div>
					</Form.Group>

					<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
						Crear texto
					</Button>
				</Form>
			</Container>
		</>
	);
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

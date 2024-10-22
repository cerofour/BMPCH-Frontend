import { useMutation, useQuery } from "@tanstack/react-query";
import { Table, Modal, Button, ButtonGroup, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { UseMutationResult } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import {
	getAllTexts,
	getAllUsers,
	UserAPIObject,
	getAllEditorials,
	getAllTypes,
	TextTypeAPIObject,
	newText,
} from "../api/api";
import { TextDTO } from "../api/api";
import { EditorialAPIObject } from "../api/api";
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

	return data?.map(mapFn);
}

function MyDropdown({ data, selected, setSelected }: any) {
	return (
		<DropdownButton variant="outline-secondary" title={selected}>
			{data.map((option: string) => (
				<Dropdown.Item key={option} onClick={() => setSelected(option)}>
					{option}
				</Dropdown.Item>
			))}
		</DropdownButton>
	);
}

function EditorialDropdown({ selected, setSelected }: any) {
	const {
		isLoading,
		isError,
		data: editorials,
		error,
	} = useQuery<EditorialAPIObject[], Error>({
		queryKey: ["getAllEditorials"],
		queryFn: getAllEditorials,
	});

	if (isLoading) return "Cargando...";

	if (isError) return "Error al cargar";

	const elements = editorials?.map((e) => e.name);

	return <MyDropdown data={elements} selected={selected} setSelected={setSelected}></MyDropdown>;
}

function TypesDropdown({ selected, setSelected }: any) {
	const {
		isLoading,
		isError,
		data: types,
		error,
	} = useQuery<TextTypeAPIObject[], Error>({
		queryKey: ["getAllTypes"],
		queryFn: getAllTypes,
	});

	if (isLoading) return "Cargando...";

	if (isError) return "Error al cargar";

	const elements = types?.map((e) => e.typename);

	return <MyDropdown data={elements} selected={selected} setSelected={setSelected}></MyDropdown>;
}
//function buildUpdateResourceForm<T> (data: T) {//}

export function NewTextForm() {
	const [title, setTitle] = useState("");
	const [editorialName, setEditorialName] = useState("");
	const [textType, setTextType] = useState("");
	const [publicationDate, setPublicationDate] = useState(new Date());
	const [numPages, setPages] = useState(0);
	const [edition, setEdition] = useState(0);
	const [volume, setVolume] = useState(0);

	const [requestBody, setRequest] = useState({});

	const mutation = useMutation({
		mutationFn: newText,
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setRequest({ title, editorialName, textType, publicationDate, edition, volume, numPages });
		mutation.mutate(requestBody as TextDTO);
	};

	return (
		<>
			<Form onSubmit={(e) => handleSubmit(e)}>
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

				<Form.Group className="mb-3" controlId="formTitulo">
					<Form.Label> Cantidad de Páginas</Form.Label>
					<Form.Control onChange={(e) => setPages(parseInt(e.target.value))} type="number"></Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formTitulo">
					<Form.Label> Edición</Form.Label>
					<Form.Control onChange={(e) => setEdition(parseInt(e.target.value))} type="number"></Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formTitulo">
					<Form.Label>Volumen</Form.Label>
					<Form.Control onChange={(e) => setVolume(parseInt(e.target.value))} type="number"></Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Editorial</Form.Label>
					<EditorialDropdown selected={editorialName} setSelected={setEditorialName}></EditorialDropdown>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Tipo de Texto</Form.Label>
					<TypesDropdown selected={textType} setSelected={setTextType}></TypesDropdown>
				</Form.Group>
				<Button variant="primary" type="submit">
					Crear texto
				</Button>
			</Form>
		</>
	);
}

export function NewTextModal({ enabled, setEnabled }: any) {
	const handleShow = () => setEnabled(true);
	const handleClose = () => setEnabled(false);
	const handleSave = () => setEnabled(false);

	return (
		<Modal show={enabled} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Añadir nuevo texto</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<NewTextForm></NewTextForm>
			</Modal.Body>
		</Modal>
	);
}

export function TextsTable() {
	const {
		isLoading,
		isError,
		data: books,
		error,
	} = useQuery<TextAPIObject[], Error>({
		queryKey: ["getAllTexts"],
		queryFn: getAllTexts,
	});

	const [showUpdateModal, setShowUpdateModal] = useState(true);

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
					<Button variant="danger">Eliminar</Button>
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
	const { isLoading, isError, data, error } = useQuery<UserAPIObject[], Error>({
		queryKey: ["getAllUsers"],
		queryFn: getAllUsers,
	});

	/*
	 */

	const tableContent: any = buildTableContent(6, isLoading, isError, data, (user: UserAPIObject) => (
		<tr>
			<td>{user.userId}</td>
			<td>{user.roleId}</td>
			<td>{user.documentTypeId}</td>
			<td>{user.document}</td>
			<td>{firstN(user.psk, 12)}</td>
			<td>
				<ButtonGroup aria-label="Basic example">
					<Button variant="secondary">Actualizar</Button>
					<Button variant="danger">Eliminar</Button>
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
						<th>Tipo de Documento</th>
						<th>Documento</th>
						<th>PSK</th>
						<th>Operaciones</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
		</>
	);
}

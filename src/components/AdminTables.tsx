import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";

import {
	getAllTexts,
	getAllUsers,
	deleteUser,
	deleteText,
	getAllCustomers,
	getAllAuthors,
	deleteCustomer,
	deleteAuthor,
} from "../api/api";
import { UserAPIObject, TextAPIObject, CustomerAPIObject, AuthorAPIObject } from "../api/types";
import { ConfirmationModal } from "./CustomModals";
import { prettifyAddress } from "./Utils";
import { Link } from "react-router-dom";
import { BootstrapIcons } from "./Icon";

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
			<td>
				<ButtonGroup aria-label="Basic example">
					<Button variant="secondary">
						<BootstrapIcons iconName="PersonFillUp" size={25} />
					</Button>
					<Button onClick={() => handleShowModal(user.userId)} variant="danger">
						<BootstrapIcons iconName="PersonFillDash" size={25} />
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
						<th>Operaciones</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este usuario?"
			></ConfirmationModal>
		</>
	);
}

export function CustomersTable({ reload, setReload }: any) {
	const {
		isLoading,
		isError,
		data: customers,
		refetch,
	} = useQuery<CustomerAPIObject[], Error>({
		queryKey: ["getAllCustomers"],
		queryFn: getAllCustomers,
	});

	const [showModal, setShowModal] = useState(false);
	const [customerIdToDelete, setCustomerIdToDelete] = useState<number | null>(null);

	const deleteCustomerMutation = useMutation({
		mutationFn: deleteCustomer,
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

	const handleShowModal = (customerId: number) => {
		setCustomerIdToDelete(customerId);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setCustomerIdToDelete(null);
	};

	const handleConfirmDelete = () => {
		if (customerIdToDelete === null) return;
		deleteCustomerMutation.mutate(customerIdToDelete);
		handleCloseModal();
	};

	const tableContent: any = buildTableContent(9, isLoading, isError, customers, (customer: CustomerAPIObject) => (
		<tr key={customer.id}>
			<td>{customer.id}</td>
			<td>
				<Link to={`/usuarios/${customer.user.userId}`}>{customer.user.document}</Link>
			</td>
			<td>{customer.email}</td>
			<td>{prettifyAddress(customer.address)}</td>
			<td>{customer.carnet.carnetIssuanceDate.toString()}</td>
			<td>{customer.carnet.carnetExpirationDate.toString()}</td>
			<td>
				<ButtonGroup aria-label="Basic example">
					<Button variant="secondary">Actualizar</Button>
					<Button onClick={() => handleShowModal(customer.id)} variant="danger">
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
						<th>DNI</th>
						<th>Correo</th>
						<th>Dirección</th>
						<th>Fecha Registro</th>
						<th>Fecha Expiración</th>
						<th>Opciones</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este cliente?"
			></ConfirmationModal>
		</>
	);
}

export function AuthorsTable({ reload, setReload }: any) {
	const {
		isLoading,
		isError,
		data: authors,
		refetch,
	} = useQuery<AuthorAPIObject[], Error>({
		queryKey: ["getAllAuthors"],
		queryFn: getAllAuthors,
	});

	const [showModal, setShowModal] = useState(false);
	const [authorIdToDelete, setAuthorIdToDelete] = useState<number | null>(null);

	const deleteAuthorMutation = useMutation({
		mutationFn: deleteAuthor,
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

	const handleShowModal = (authorId: number) => {
		setAuthorIdToDelete(authorId);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setAuthorIdToDelete(null);
	};

	const handleConfirmDelete = () => {
		if (authorIdToDelete === null) return;
		deleteAuthorMutation.mutate(authorIdToDelete);
		handleCloseModal();
	};

	const tableContent: any = buildTableContent(9, isLoading, isError, authors, (author: AuthorAPIObject) => (
		<tr key={author.id}>
			<td>{author.id}</td>
			<td>{author.name}</td>
			<td>{author.plastName}</td>
			<td>{author.mlastName}</td>
			<td>
				<ButtonGroup aria-label="Basic example">
					<Button variant="secondary">Actualizar</Button>
					<Button onClick={() => handleShowModal(author.id)} variant="danger">
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
						<th>Nombre</th>
						<th>Apellido Paterno</th>
						<th>Apellido Materno</th>
						<th>Opciones</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este autor?"
			></ConfirmationModal>
		</>
	);
}

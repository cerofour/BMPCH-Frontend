import { useMutation, useQuery } from "@tanstack/react-query";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";

import { Link } from "react-router-dom";

import {
	getAllTexts,
	getAllUsers,
	deleteUser,
	deleteText,
	getAllCustomers,
	getAllAuthors,
	deleteCustomer,
	deleteAuthor,
	getAllLoans,
	setLoanStatus,
} from "../api/api";
import { UserAPIObject, TextAPIObject, CustomerAPIObject, AuthorAPIObject, LoanAPIObject } from "../api/types";
import { ConfirmationModal, CustomModal } from "./CustomModals";
import { prettifyAddress } from "./Utils";
import { BootstrapIcons } from "./Icon";

import TableProps from "./tables/TableProps";
import { buildTableContent } from "./Utils";
import { NewAuthorForm } from "./form/NewAuthorForm";
import { NewCustomerForm } from "./form/NewCustomersForm";
import { NewUserForm } from "./form/NewUserForm";
import { NewTextForm } from "./form/NewTextForm";

import CRUDContext from "../hooks/CRUDContext";
import UserToClientForm from "./form/UserToClientForm";

export function LoansTable({ filterFn }: TableProps) {
	const {
		isLoading,
		isError,
		data: loans,
	} = useQuery<LoanAPIObject[], Error>({
		queryKey: ["getAllLoans"],
		queryFn: getAllLoans,
	});

	const tableContent: any = buildTableContent(
		9,
		isLoading,
		isError,
		loans,
		(loan: LoanAPIObject) => (
			<tr key={loan.id}>
				<td>{loan.id}</td>
				<td>{<Link to={"/admin/clientes/" + loan.customer.id}>{loan.customer.user.document}</Link>}</td>
				<td>
					{
						<Link to={"/admin/codigos/" + loan.codeTextualResource.id}>
							{loan.codeTextualResource.baseCode}-{loan.codeTextualResource.exemplaryCode}
						</Link>
					}
				</td>
				<td>{loan.idTypeLoan === 1 ? "En sala" : loan.idTypeLoan === 2 ? "A domicilio" : "Desconocido"}</td>
				<td>{loan.idStatusLoan === 1 ? "Activo" : loan.idStatusLoan === 2 ? "Devuelto" : "Vencido"}</td>
				<td>{loan.initialDate.toString()}</td>
				<td>{loan.endDate ? loan.endDate.toString() : "-"}</td>
				<td>{loan.scheduledDate.toString()}</td>
				<td>
					<ButtonGroup>
						<Button variant="outline-success" onClick={() => setLoanStatus(loan.id, 2)}>
							Devuelto
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		),
		filterFn,
		(item: LoanAPIObject) =>
			`${item.customer.user.document} ${item.customer.user.name} ${item.customer.user.mlastName} ${item.customer.user.plastName} ${item.codeTextualResource.baseCode}`
	);

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Cliente</th>
						<th>Código de Libro</th>
						<th>Tipo</th>
						<th>Estado</th>
						<th>Fecha Inicio</th>
						<th>Fecha Devolución</th>
						<th>Fecha Programada</th>
						<th>Opciones</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
		</>
	);
}

export function TextsTable({ reload, setReload, filterFn }: TableProps) {
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

	const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
	const [textIdToUpdate, setTextIdToUpdate] = useState<number>(0);

	const deleteTextMutation = useMutation({
		mutationFn: deleteText,
		onSuccess() {
			setReload && setReload(true);
		},
	});

	useEffect(() => {
		if (reload) {
			refetch();
			setReload && setReload(false);
		}
	}, [reload, refetch]);

	const handleShowUpdateModal = (textId: number) => {
		setTextIdToUpdate(textId);
		setShowUpdateModal(true);
	};

	// --------------------------

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
			<td>
				<Link to={`/catalogo/${book.id}`}>{book.id}</Link>
			</td>
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
					<Button onClick={() => handleShowUpdateModal(book.id)} variant="secondary">
						Actualizar
					</Button>
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
			<CustomModal
				show={showUpdateModal}
				setShow={setShowUpdateModal}
				title="Actualizar un recurso textual"
				form={NewTextForm}
				otherProps={{ isEditMode: true, id: textIdToUpdate }}
			></CustomModal>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este libro?"
			></ConfirmationModal>
		</>
	);
}

export function UsersTable({ filterFn }: TableProps) {
	const { isLoading, isError, data } = useQuery<UserAPIObject[], Error>({
		queryKey: ["getAllUsers"],
		queryFn: getAllUsers,
	});

	const [showModal, setShowModal] = useState(false);
	const [showUserToClientModal, setShowUserToClientModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

	const context = useContext(CRUDContext);

	const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
	const [userIdToUpdate, setuserIdToUpdate] = useState<number>(0);

	const deleteUserMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess() {
			context?.setToastData("Se ha eliminado el usuario satisfactoriamente", "success");
			context?.toggleToast();
		},
		onError() {
			context?.setToastData("No se ha podido eliminar el usuario", "danger");
			context?.toggleToast();
		},
	});

	const handleShowUpdateModal = (authorId: number) => {
		setuserIdToUpdate(authorId);
		setShowUpdateModal(true);
	};

	// --------------------------

	const handleShowModal = (userId: number) => {
		setSelectedUserId(userId);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedUserId(null);
	};

	const handleConfirmDelete = () => {
		if (selectedUserId === null) return;
		deleteUserMutation.mutate(selectedUserId);
		handleCloseModal();
	};

	const handleUserToClient = (e: MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault();

		setSelectedUserId(id);
		setShowUserToClientModal(true);
	};

	const tableContent: any = buildTableContent(
		6,
		isLoading,
		isError,
		data,
		(user: UserAPIObject) => (
			<tr key={user.userId}>
				<td>{user.userId}</td>
				<td>{`${user.role.name.slice(0, 4)}...`}</td>
				<td>{user.document}</td>
				<td>{user.name}</td>
				<td>{user.plastName}</td>
				<td>{user.mlastName}</td>
				<td>{user.phoneNumber}</td>
				<td>{user.gender.genderName[0]}</td>
				<td>
					<ButtonGroup aria-label="Basic example">
						<Button onClick={() => handleShowUpdateModal(user.userId)} variant="secondary">
							<BootstrapIcons iconName="PersonFillUp" size={25} />
						</Button>
						<Button onClick={() => handleShowModal(user.userId)} variant="danger">
							<BootstrapIcons iconName="PersonFillDash" size={25} />
						</Button>
						<Button onClick={(e) => handleUserToClient(e, user.userId)} variant="outline-success">
							Hacer Cliente
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		),
		filterFn,
		(item: UserAPIObject) => `${item.document} ${item.name} ${item.mlastName} ${item.plastName}`
	);

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
			<CustomModal
				show={showUpdateModal}
				setShow={setShowUpdateModal}
				title="Actualizar un usuario"
				form={NewUserForm}
				otherProps={{ isEditMode: true, id: userIdToUpdate }}
			></CustomModal>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este usuario?"
			></ConfirmationModal>
			<CustomModal
				title="Convertir a este usuario en cliente"
				form={({ setShow }: any) => (
					<UserToClientForm setShow={setShow} userId={selectedUserId}></UserToClientForm>
				)}
				show={showUserToClientModal}
				setShow={setShowUserToClientModal}
			></CustomModal>
		</>
	);
}

export function CustomersTable({ reload, setReload, filterFn }: TableProps) {
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

	const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
	const [customerIdToUpdate, setCustomerIdToUpdate] = useState<number>(0);

	const deleteCustomerMutation = useMutation({
		mutationFn: deleteCustomer,
		onSuccess() {
			setReload && setReload(true);
		},
	});

	useEffect(() => {
		if (reload) {
			refetch();
			setReload && setReload(false);
		}
	}, [reload, refetch]);

	const handleShowUpdateModal = (authorId: number) => {
		setCustomerIdToUpdate(authorId);
		setShowUpdateModal(true);
	};

	// --------------------------

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

	const tableContent: any = buildTableContent(
		9,
		isLoading,
		isError,
		customers,
		(customer: CustomerAPIObject) => (
			<tr key={customer.id}>
				<td>
					<Link to={`/admin/clientes/${customer.id}`}>{customer.id}</Link>
				</td>
				<td>
					<Link to={`/admin/usuarios/${customer.user.userId}`}>{customer.user.document}</Link>
				</td>
				<td>{customer.email}</td>
				<td>{prettifyAddress(customer.address)}</td>
				<td>{customer.carnet.carnetIssuanceDate.toString()}</td>
				<td>{customer.carnet.carnetExpirationDate.toString()}</td>
				<td>
					<ButtonGroup aria-label="Basic example">
						<Button variant="secondary" onClick={() => handleShowUpdateModal(customer.id)}>
							Actualizar
						</Button>
						<Button onClick={() => handleShowModal(customer.id)} variant="danger">
							Eliminar
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		),
		filterFn,
		(item: CustomerAPIObject) =>
			`${item.user.document} ${item.user.name} ${item.user.mlastName} ${item.user.plastName}`
	);

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
			<CustomModal
				show={showUpdateModal}
				setShow={setShowUpdateModal}
				title="Actualizar un cliente"
				form={NewCustomerForm}
				otherProps={{ isEditMode: true, id: customerIdToUpdate }}
			></CustomModal>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este cliente?"
			></ConfirmationModal>
		</>
	);
}

export function AuthorsTable({ reload, setReload, filterFn }: TableProps) {
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

	const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
	const [authorIdToUpdate, setAuthorIdToUpdate] = useState<number>(0);

	const deleteAuthorMutation = useMutation({
		mutationFn: deleteAuthor,
		onSuccess() {
			setReload && setReload(true);
		},
	});

	useEffect(() => {
		if (reload) {
			refetch();
			setReload && setReload(false);
		}
	}, [reload, refetch]);

	const handleShowUpdateModal = (authorId: number) => {
		setAuthorIdToUpdate(authorId);
		setShowUpdateModal(true);
	};

	// ------------------------------------

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

	const tableContent: any = buildTableContent(
		9,
		isLoading,
		isError,
		authors,
		(author: AuthorAPIObject) => (
			<tr key={author.id}>
				<td>{author.id}</td>
				<td>{author.name}</td>
				<td>{author.plastName}</td>
				<td>{author.mlastName}</td>
				<td>
					<ButtonGroup aria-label="Basic example">
						<Button onClick={() => handleShowUpdateModal(author.id)} variant="secondary">
							Actualizar
						</Button>
						<Button onClick={() => handleShowModal(author.id)} variant="danger">
							Eliminar
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		),
		filterFn,
		(item: AuthorAPIObject) => `${item.name} ${item.mlastName} ${item.plastName}`
	);

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
			<CustomModal
				show={showUpdateModal}
				setShow={setShowUpdateModal}
				title="Actualizar un autor"
				form={NewAuthorForm}
				otherProps={{ isEditMode: true, id: authorIdToUpdate }}
			></CustomModal>
			<ConfirmationModal
				show={showModal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
				message="¿Desea eliminar este autor?"
			></ConfirmationModal>
		</>
	);
}

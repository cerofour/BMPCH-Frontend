import { useMutation, useQuery} from "@tanstack/react-query";
import { Table} from "react-bootstrap";
import { FormEvent, useState } from "react";
import {
	getAllTexts,
	deleteText,
} from "../api/api";
import { TextAPIObject } from "../api/api";
import MyDeleteButton from "./DeleteButton";
import MyEditButton from "./EditButton";

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

export function MyResourcesTable() {
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

    const handleEdit = (e: FormEvent, id: number) => {
        e.preventDefault();
    }

	const handleDelete = (e: FormEvent, id: number) => {
		e.preventDefault();
		deleteTextMutation.mutate(id);
	};

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
				{/* <ButtonGroup aria-label="Basic example">
					<Button variant="secondary">Actualizar</Button>
					<Button onClick={(e) => handleDelete(e, book.id)} variant="danger">
						Eliminar
					</Button>
				</ButtonGroup> */}
                <MyEditButton onEdit={(e) => handleEdit(e, book.id)}/>
			</td>
            <td>
                <MyDeleteButton onDelete={(e) => handleDelete(e, book.id)}/>
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
						<th></th>
                        <th></th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
		</>
	);
}
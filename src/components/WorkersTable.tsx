import { useMutation, useQuery } from "@tanstack/react-query";
import { Table } from "react-bootstrap";
import { FormEvent, useState } from "react";
import {getAllUsers,deleteUser} from "../api/api";
import MyEditButton from "./EditButton";
import {UserAPIObject} from "../api/types"
import MyDeleteButton from "./DeleteButton";
import {firstN} from "./Utils";

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

export function MyWorkersTable() {
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

    const handleEdit = (e: FormEvent, id: number) => {
        e.preventDefault();
    }

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
                {/* <ButtonGroup aria-label="Basic example">
					<Button variant="secondary">Actualizar</Button>
					<Button onClick={(e) => handleDelete(e, user.userId)} variant="danger">
						Eliminar
					</Button>
				</ButtonGroup> */}
                <MyEditButton onEdit={(e) => handleEdit(e, user.userId)}/>
			</td>
            <td>
                <MyDeleteButton onDelete={(e) => handleDelete(e, user.userId)}/>
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
						<th></th>
                        <th></th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
		</>
	);
}

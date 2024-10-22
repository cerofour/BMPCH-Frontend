import { useQuery } from "@tanstack/react-query";
import { Table } from "react-bootstrap";

import { UserAPIObject, getAllUsers } from "../api/api";

function Users() {
	return <div className="main-container">{UsersTable()}</div>;
}

function UsersTable() {
	const { isLoading, isError, data, error } = useQuery<UserAPIObject[], Error>({
		queryKey: ["getAllUsers"],
		queryFn: getAllUsers,
	});

	let userTsx: any = {};

	if (isLoading)
		userTsx = (
			<tr>
				<td colSpan={5}>Cargando usuarios</td>
			</tr>
		);

	if (isError)
		userTsx = (
			<tr>
				<td colSpan={5}>Ocurrió un error inesperado y no se pueden cargar los usuarios.</td>
			</tr>
		);

	userTsx = data?.map((user) => (
		<tr>
			<td>{user.userId}</td>
			<td>{user.roleId}</td>
			<td>{user.documentTypeId}</td>
			<td>{user.document}</td>
			<td>{user.psk}</td>
		</tr>
	));

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>userId</th>
					<th>roleId</th>
					<th>documentTypeId</th>
					<th>document</th>
					<th>psk</th>
				</tr>
			</thead>
			<tbody>{userTsx}</tbody>
		</Table>
	);
}

export default Users;

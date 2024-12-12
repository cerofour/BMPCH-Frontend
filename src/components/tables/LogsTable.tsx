import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

import { getAllLogs } from "../../api/api";
import { LogAPIObject } from "../../api/types";

import { buildTableContent } from "../Utils";

import TableProps from "./TableProps";

export default function LogsTable({ filterFn }: TableProps) {
	const {
		isLoading,
		isError,
		data: editorials,
	} = useQuery<LogAPIObject[], Error>({
		queryKey: ["getAllLogs"],
		queryFn: getAllLogs,
	});

	const tableContent: any = buildTableContent(
		9,
		isLoading,
		isError,
		editorials,
		(log: LogAPIObject) => (
			<tr key={log.id}>
				<td>{log.id}</td>
				<td>
					<Link to={`/admin/usuarios/${log.userId}`}>{log.userId}</Link>
				</td>
				<td>{log.detail}</td>
				<td>{log.ip}</td>
				<td>{log.fec.toString()}</td>
			</tr>
		),
		filterFn,
		(item: LogAPIObject) => item.detail,
		(a: LogAPIObject, b: LogAPIObject) => a.id - b.id
	);

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Usuario</th>
						<th>Detalle</th>
						<th>IP</th>
						<th>Fecha</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</Table>
		</>
	);
}

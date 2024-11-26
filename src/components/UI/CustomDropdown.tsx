import { useState } from "react";
import { Spinner, DropdownButton, Dropdown, Alert } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

type CustomDropdownProps<T> = {
	qKey: string[];
	qFn: () => Promise<T[]>;
	getOptionLabel: any;
	setSelectedItem: any;
	mapSelectedValue: (e: any) => string | number;
};

export default function CustomDropdown<T>({
	qKey,
	qFn,
	getOptionLabel,
	setSelectedItem,
	mapSelectedValue,
}: CustomDropdownProps<T>) {
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

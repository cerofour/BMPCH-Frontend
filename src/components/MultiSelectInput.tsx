import Select, { ActionMeta, MultiValue } from "react-select";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/esm/Spinner";
import Alert from "react-bootstrap/esm/Alert";
import { useState } from "react";

type MultiSelectWithAutocompleteProps<T> = {
	qKey: string[];
	qFn: () => Promise<T[]>;
	getOptionLabel: any;
	getOptionValue: any;
	setSelected: any;
};

export function MultiSelectWithAutocomplete<T>({
	qKey,
	qFn,
	setSelected,
	getOptionLabel,
	getOptionValue,
}: MultiSelectWithAutocompleteProps<T>) {
	const { isLoading, isError, data } = useQuery<T[], Error>({
		queryKey: qKey,
		queryFn: qFn,
	});

	const [selectedOptions, setSelectedOptions] = useState<MultiValue<T>>([]);

	const handleSelectChange = (newValue: MultiValue<T>, _: ActionMeta<T>) => {
		setSelectedOptions(newValue);
		setSelected(newValue.map((e) => getOptionValue(e)));
	};

	if (isLoading) return <Spinner animation="border" role="status" />;

	if (isError) return <Alert variant="danger">No se pudo cargar.</Alert>;

	return (
		<div className="container mt-4">
			<Select
				isMulti
				options={data || []} // Opciones predefinidas
				value={selectedOptions} // Valores seleccionados
				onChange={handleSelectChange} // Actualizar los seleccionados
				placeholder="Escribe para buscar y seleccionar..."
				className="basic-multi-select"
				classNamePrefix="select"
				getOptionLabel={getOptionLabel}
				getOptionValue={getOptionValue}
			/>
		</div>
	);
}

export default MultiSelectWithAutocomplete;

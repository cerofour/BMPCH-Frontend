import Select, { ActionMeta, MultiValue } from "react-select";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/esm/Spinner";
import Alert from "react-bootstrap/esm/Alert";
import { useEffect, useState } from "react";

type SelectWithAutoCompleteProps<T> = {
	qKey: string[];
	qFn: () => Promise<T[]>;
	getOptionLabel: any;
	getOptionValue: any;
	isMulti: boolean;
	setSelected: any;
	defaultValue?: any;
};

export function SelectWithAutoComplete<T>({
	qKey,
	qFn,
	setSelected,
	getOptionLabel,
	getOptionValue,
	isMulti,
	defaultValue,
}: SelectWithAutoCompleteProps<T>) {
	const { isLoading, isError, data } = useQuery<T[], Error>({
		queryKey: qKey,
		queryFn: qFn,
	});

	const [selectedOptions, setSelectedOptions] = useState<MultiValue<T> | T | null>([]);

	const handleSelectChange = (newValue: MultiValue<T> | T | null, _: ActionMeta<T>) => {
		setSelectedOptions(newValue);
		if (isMulti) {
			setSelected((newValue as MultiValue<T>)?.map((e) => getOptionValue(e)));
		} else {
			setSelected(getOptionValue(newValue as T));
		}
	};

    useEffect(() => {
		const values = [...defaultValue];
		if(data){
			const initialOptions: MultiValue<T> = data?.filter(
				(item) => values.includes(getOptionValue(item))) || [];

			if(defaultValue || initialOptions.length > 0){
				setSelectedOptions(initialOptions);
	
				if (isMulti) {
					setSelected(initialOptions.map((option) => getOptionValue(option)));
				} else {
					setSelected(getOptionValue(initialOptions[0]));
				}
			}
		}

    }, [data]);

	if (isLoading) return <Spinner animation="border" role="status" />;

	if (isError) return <Alert variant="danger">No se pudo cargar.</Alert>;

	return (
		<div className="container mt-1">
			{isMulti ? (
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
				/>) : (
				<Select
					options={data || []} // Opciones predefinidas
					value={selectedOptions as T | null} // Valores seleccionados
					onChange={handleSelectChange} // Actualizar los seleccionados
					placeholder="Escribe para buscar y seleccionar..."
					className="basic-multi-select"
					classNamePrefix="select"
					getOptionLabel={getOptionLabel}
					getOptionValue={getOptionValue}
				/>)
			}
		</div>
	);
}

export default SelectWithAutoComplete;

import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface ValidatedFormGroupProps {
	controlId: string;
	label: string;
	type: "text" | "number" | "email" | "password" | "date";
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	minValue?: number;
	maxValue?: number;
	dataType?: "text" | "number" | "email" | "date";
	errorMessage?: string;
	placeholder?: string;
	placeholderIsExample?: boolean;
	setBadInput: (y: boolean) => void;
}

const ValidatedFormGroup: React.FC<ValidatedFormGroupProps> = ({
	controlId,
	label,
	type,
	value,
	onChange,
	placeholderIsExample = false,
	required = false,
	minLength,
	maxLength,
	dataType,
	errorMessage,
	placeholder,
	minValue,
	maxValue,
	setBadInput,
}) => {
	const [error, setError] = useState<string>("");

	const validate = (val: string | number): string => {
		let error = "";
		let valStr = val.toString();

		/* this is horrible but it works. */
		if (required && !val) {
			error = "Este campo es requerido";
		}

		if (typeof val === "string") {
			if (minLength && valStr.length < minLength) error = `La longitud mínima es ${minLength}.`;
			else if (maxLength && valStr.length > maxLength) error = `La longitud máxima es ${maxLength}.`;
		}

		if (dataType == "number") {
			if (typeof val === "string" && !/^\d+$/.test(valStr)) error = "Este campo debe ser un número.";
			else if (typeof value === "number") {
				// check if its a number
				if (minValue && value < minValue) error = `El valor mínimo es es ${minValue}.`;
				else if (maxValue && value > maxValue) error = `El valor máximo es es ${maxValue}.`;
			}
		}

		// Call setBadInput if there's an error
		if (error) {
			setBadInput(true);
		} else {
			setBadInput(false);
		}

		return error;
	};

	const handleBlur = () => {
		const validationError = validate(value);
		setError(validationError);
	};

	return (
		<Form.Group className="mb-3" controlId={controlId}>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type={type}
				value={value}
				onChange={onChange} // Updates the parent value without validation
				onBlur={handleBlur} // Validates when the field loses focus
				isInvalid={!!error}
				placeholder={(placeholderIsExample ? "Ej. " : "") + placeholder}
			/>
			<Form.Control.Feedback type="invalid">{error || errorMessage}</Form.Control.Feedback>
		</Form.Group>
	);
};

export default ValidatedFormGroup;

import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface ValidatedFormGroupProps {
	controlId: string;
	label: string;
	type: "text" | "number" | "email" | "password";
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	dataType?: "text" | "number" | "email";
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
	setBadInput,
}) => {
	const [error, setError] = useState<string>("");

	const validate = (val: string): string => {
		let error = "";

		if (required && !val) {
			error = "Este campo es requerido.";
		} else if (minLength && val.length < minLength) {
			error = `La longitud mínima es ${minLength}.`;
		} else if (maxLength && val.length > maxLength) {
			error = `La longitud máxima es ${maxLength}.`;
		} else if (dataType === "number" && isNaN(Number(val))) {
			error = "Se debe escribir un número.";
		} else if (dataType === "email" && !/\S+@\S+\.\S+/.test(val)) {
			error = "Se debe escribir un correo.";
		}

		// Call setBadInput if there's an error
		if (error && typeof setBadInput === "function") {
			setBadInput(true);
		} else if (typeof setBadInput === "function") {
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

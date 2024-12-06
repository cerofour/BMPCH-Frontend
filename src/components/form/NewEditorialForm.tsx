import { useState, useContext, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";

import { Container, Button, Form, Alert } from "react-bootstrap";

import CRUDContext from "../../hooks/CRUDContext";

import ValidatedFormGroup from "../UI/FormControlValidator";
import { newEditorial } from "../../api/api";
import { EditorialDTO } from "../../api/types";

export default function NewEditorialForm({ setShow }: any) {
	const [name, setName] = useState("");
	const [badInput, setBadInput] = useState<boolean>(false);
	const context = useContext(CRUDContext);

	const mutation = useMutation({
		mutationFn: newEditorial,
		onSuccess: () => {
			context?.toggleToast();
			context?.setToastData("La editorial se ha creado exitosamente.", "success");
			setShow(false);
		},

		onError: () => {
			context?.toggleToast();
			context?.setToastData("No se ha podido crear el autor.", "danger");
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (badInput) {
			e.stopPropagation();
			return;
		}

		const requestBody: EditorialDTO = {
			name,
		};

		mutation.mutate(requestBody);
	};

	return (
		<>
			<Container fluid>
				<Form>
					<ValidatedFormGroup
						controlId="name"
						label="Nombre de la Editorial"
						type="text"
						dataType="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						minLength={2}
						maxLength={255}
						placeholder="Editorial"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>

					{badInput && <Alert variant="danger">Algunos datos ingresados son inválidos.</Alert>}

					<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
						Crear Editorial
					</Button>
				</Form>
			</Container>
		</>
	);
}

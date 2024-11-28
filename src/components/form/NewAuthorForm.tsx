import { useState, FormEvent, useContext } from "react";

import { useMutation } from "@tanstack/react-query";

import { Form, Container, Button, Alert } from "react-bootstrap";

import { AuthorDTO } from "../../api/types";
import { newAuthor } from "../../api/api";

import ValidatedFormGroup from "../UI/FormControlValidator";

import CRUDContext from "../../hooks/CRUDContext";

export function NewAuthorForm({ setShow }: any) {
	const [name, setName] = useState("");
	const [plastname, setPlastname] = useState("");
	const [mlastname, setMlastname] = useState("");
	const [badInput, setBadInput] = useState<boolean>(false);
	const context = useContext(CRUDContext);

	const mutation = useMutation({
		mutationFn: newAuthor,
		onSuccess: () => {
			context?.toggleToast();
			context?.setToastData("El autor se ha creado exitosamente.", "success");
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

		const requestBody: AuthorDTO = {
			name,
			pseudoname: name,
			plastname,
			mlastname,
		};

		mutation.mutate(requestBody as AuthorDTO);
	};

	return (
		<>
			<Container fluid>
				<Form>
					<ValidatedFormGroup
						controlId="name"
						label="Nombre"
						type="text"
						dataType="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						minLength={2}
						maxLength={255}
						placeholder="Abraham"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>

					<ValidatedFormGroup
						controlId="plastname"
						label="Apellido Paterno"
						type="text"
						dataType="text"
						value={plastname}
						onChange={(e) => setPlastname(e.target.value)}
						minLength={2}
						maxLength={255}
						placeholder="Valdelomar"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>

					<ValidatedFormGroup
						controlId="plastname"
						label="Apellido Materno"
						type="text"
						dataType="text"
						value={mlastname}
						onChange={(e) => setMlastname(e.target.value)}
						minLength={2}
						maxLength={255}
						placeholder="Pinto"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>

					{badInput && <Alert variant="danger">Algunos datos ingresados son inválidos.</Alert>}

					<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
						Crear Autor
					</Button>
				</Form>
			</Container>
		</>
	);
}

import { useState, FormEvent, useContext, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { Form, Container, Button, Alert } from "react-bootstrap";

import { AuthorDTO } from "../../api/types";
import { getAuthorById, newAuthor, updateAuthor } from "../../api/api";

import ValidatedFormGroup from "../UI/FormControlValidator";

import CRUDContext from "../../hooks/CRUDContext";

type PropsForm = {
	setShow: any;
	isEditMode?: boolean;
	id?: number;
};

export function NewAuthorForm({ setShow, isEditMode, id }: PropsForm) {
	const [name, setName] = useState("");
	const [plastname, setPlastname] = useState("");
	const [mlastname, setMlastname] = useState("");
	const [badInput, setBadInput] = useState<boolean>(false);

	const [isFetchingAuthor, setIsFetchingAuthor] = useState(false);
	const [fetchError, setFetchError] = useState<boolean>(false);

	const context = useContext(CRUDContext);

	useEffect(() => {
		if (isEditMode && id) {
			setIsFetchingAuthor(true);
			getAuthorById(id)
				.then((data) => {
					setName(data.name || "");
					setPlastname(data.plastName || "");
					setMlastname(data.mlastName || "");
				})
				.catch(() => {
					setFetchError(true);
				})
				.finally(() => setIsFetchingAuthor(false));
		}
	}, [isEditMode, id]);

	const mutation = useMutation({
		mutationFn: ({ id, data }: { id?: number; data: AuthorDTO }) => {
			return isEditMode && id ? updateAuthor(id, data) : newAuthor(data);
		},
		onSuccess: () => {
			context?.toggleToast();
			context?.setToastData(
				isEditMode ? "El autor se ha actualizado exitosamente." : "El autor se ha creado exitosamente.",
				"success"
			);
			setShow(false);
		},

		onError: () => {
			context?.toggleToast();
			context?.setToastData(
				isEditMode ? "No se ha podido actualizar el autor." : "No se ha podido crear el autor.",
				"danger"
			);
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
		if (isEditMode) mutation.mutate({ id: id, data: requestBody });
		else mutation.mutate({ data: requestBody });
	};

	return (
		<>
			{isFetchingAuthor ? (
				<p>Cargando...</p>
			) : fetchError ? (
				<p>Error al cargar el autor.</p>
			) : (
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
							{isEditMode ? "Actualizar Autor" : "Crear Autor"}
						</Button>
					</Form>
				</Container>
			)}
		</>
	);
}

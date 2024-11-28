import { useState, FormEvent, useContext } from "react";

import { useMutation } from "@tanstack/react-query";

import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

import ValidatedFormGroup from "../UI/FormControlValidator";
import CustomDropdown from "../UI/CustomDropdown";
import MultiSelectWithAutocomplete from "../MultiSelectInput";

import { AuthorAPIObject, EditorialAPIObject, TextTypeAPIObject, TextDTO } from "../../api/types";
import { getAllEditorials, getAllAuthors, getAllTypes, newText } from "../../api/api";
import CRUDContext from "../../hooks/CRUDContext";

export function NewTextForm({ setShow }: any) {
	const [title, setTitle] = useState("");
	const [editorialId, setEditorialId] = useState(undefined);
	const [typeId, setTypeId] = useState(undefined);
	const [publicationDate, setPublicationDate] = useState(new Date());
	const [numPages, setPages] = useState(0);
	const [edition, setEdition] = useState(0);
	const [volume, setVolume] = useState(0);
	const [authors, setAuthors] = useState<number[]>([]);
	const [badInput, setBadInput] = useState<boolean>(false);

	const context = useContext(CRUDContext);

	const mutation = useMutation({
		mutationFn: newText,
		onSuccess: () => {
			context?.toggleToast();
			context?.setToastData("Texto creado exitosamente.", "success");
			setShow(false);
		},
		onError: () => {
			context?.toggleToast();
			context?.setToastData("No se ha podido crear el texto.", "danger");
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (editorialId == undefined || typeId == undefined || authors.length == 0) {
			setBadInput(true);
			return;
		}

		const requestBody: TextDTO = {
			title,
			editorialId,
			publicationDate,
			typeId,
			edition,
			volume,
			numPages,
			authors,
		};
		setShow(false);
		mutation.mutate(requestBody as TextDTO);
	};

	return (
		<>
			<Container fluid>
				<Form>
					<ValidatedFormGroup
						controlId="title"
						label="Título"
						type="text"
						dataType="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						minLength={2}
						maxLength={255}
						placeholder="El caballero Carmelo"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>
					<Form.Group className="mb-3" controlId="formTitulo">
						<Form.Label> Fecha de Publicación</Form.Label>
						<Form.Control
							onChange={(e) => setPublicationDate(new Date(e.target.value))}
							datatype="date"
							type="date"
							required
						></Form.Control>
						<Form.Control.Feedback>La fecha es inválida</Form.Control.Feedback>
					</Form.Group>

					<Row>
						<Col>
							<ValidatedFormGroup
								controlId="pages"
								label="Páginas"
								type="number"
								dataType="number"
								minValue={1}
								value={numPages}
								onChange={(e) => setPages(parseInt(e.target.value))}
								setBadInput={setBadInput}
								placeholder="345"
								placeholderIsExample
								required
							/>
						</Col>

						<Col>
							<ValidatedFormGroup
								controlId="editorial"
								label="Editorial"
								type="number"
								dataType="number"
								minValue={1}
								value={edition}
								onChange={(e) => setEdition(parseInt(e.target.value))}
								setBadInput={setBadInput}
								placeholder="1"
								placeholderIsExample
								required
							/>
						</Col>

						<Col>
							<ValidatedFormGroup
								controlId="volume"
								label="Volumen"
								type="number"
								dataType="number"
								minValue={1}
								value={volume}
								onChange={(e) => setVolume(parseInt(e.target.value))}
								setBadInput={setBadInput}
								placeholder="1"
								placeholderIsExample
								required
							/>
						</Col>
					</Row>

					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Editorial</Form.Label>
								<CustomDropdown
									qKey={["getAllEditorials"]}
									qFn={getAllEditorials}
									getOptionLabel={(e: EditorialAPIObject) => e.name}
									setSelectedItem={setEditorialId}
									mapSelectedValue={(e: EditorialAPIObject) => e.id}
								></CustomDropdown>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Tipo de Texto</Form.Label>
								<CustomDropdown
									qKey={["getAllTypes"]}
									qFn={getAllTypes}
									getOptionLabel={(e: TextTypeAPIObject) => e.typename}
									setSelectedItem={setTypeId}
									mapSelectedValue={(e: TextTypeAPIObject) => e.typeId}
								></CustomDropdown>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Seleccionar Autores</Form.Label>
						<MultiSelectWithAutocomplete
							qKey={["getAllAuthors"]}
							qFn={getAllAuthors}
							getOptionLabel={(e: AuthorAPIObject) => `${e.name} ${e.plastName} ${e.mlastName}`}
							getOptionValue={(e: AuthorAPIObject) => e.id}
							setSelected={setAuthors}
						></MultiSelectWithAutocomplete>
					</Form.Group>

					{badInput && <Alert variant="danger">Algunos datos ingresados son inválidos.</Alert>}
					<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
						Crear texto
					</Button>
				</Form>
			</Container>
		</>
	);
}

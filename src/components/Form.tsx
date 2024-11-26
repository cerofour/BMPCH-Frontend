import { useQuery, useMutation } from "@tanstack/react-query";

import { Spinner, Alert, DropdownButton, Form, Container, Button, Dropdown } from "react-bootstrap";
import { useContext, useState } from "react";
import { FormEvent } from "react";

import MultiSelectWithAutocomplete from "./MultiSelectInput";

import { TextDTO, AuthorAPIObject, TextTypeAPIObject, EditorialAPIObject, AuthorDTO, GenderDTO } from "../api/types";
import { getAllTypes, getAllEditorials, getAllAuthors, getAllGenders, newText, newUser, newAuthor } from "../api/api";

import CustomDropdown from "./UI/CustomDropdown";

export function NewTextForm({ show, setShow, reload, setReload }: any) {
	const [title, setTitle] = useState("");
	const [editorialId, setEditorialId] = useState(0);
	const [typeId, setTypeId] = useState(0);
	const [publicationDate, setPublicationDate] = useState(new Date());
	const [numPages, setPages] = useState(0);
	const [edition, setEdition] = useState(0);
	const [volume, setVolume] = useState(0);
	const [authors, setAuthors] = useState<number[]>([]);

	const mutation = useMutation({
		mutationFn: newText,
		onSuccess: () => {
			setReload(true);
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

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
					<Form.Group className="mb-3" controlId="formTitulo">
						<Form.Label> Título </Form.Label>
						<Form.Control
							placeholder="Escribe el título del libro"
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							required
						></Form.Control>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formTitulo">
						<Form.Label> Fecha de Publicación</Form.Label>
						<Form.Control
							onChange={(e) => setPublicationDate(new Date(e.target.value))}
							type="date"
							required
						></Form.Control>
					</Form.Group>

					<Container className="d-flex justify-content-between px-0">
						<Form.Group className="mb-3" controlId="formTitulo">
							<Form.Label> Cantidad de Páginas</Form.Label>
							<Form.Control
								onChange={(e) => setPages(parseInt(e.target.value))}
								type="number"
								required
							></Form.Control>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formTitulo">
							<Form.Label> Edición</Form.Label>
							<Form.Control
								onChange={(e) => setEdition(parseInt(e.target.value))}
								type="number"
								required
							></Form.Control>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formTitulo">
							<Form.Label>Volumen</Form.Label>
							<Form.Control
								onChange={(e) => setVolume(parseInt(e.target.value))}
								type="number"
								required
							></Form.Control>
						</Form.Group>
					</Container>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<div className="d-flex justify-content-between">
							<Form.Label>Editorial</Form.Label>
							<CustomDropdown
								qKey={["getAllEditorials"]}
								qFn={getAllEditorials}
								getOptionLabel={(e: EditorialAPIObject) => e.name}
								setSelectedItem={setEditorialId}
								mapSelectedValue={(e: EditorialAPIObject) => e.id}
							></CustomDropdown>
						</div>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<div className="d-flex justify-content-between">
							<Form.Label>Tipo de Texto</Form.Label>
							<CustomDropdown
								qKey={["getAllTypes"]}
								qFn={getAllTypes}
								getOptionLabel={(e: TextTypeAPIObject) => e.typename}
								setSelectedItem={setTypeId}
								mapSelectedValue={(e: TextTypeAPIObject) => e.typeId}
							></CustomDropdown>
						</div>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<div className="d-flex justify-content-between">
							<Form.Label>Seleccionar Autores</Form.Label>
							<MultiSelectWithAutocomplete
								qKey={["getAllAuthors"]}
								qFn={getAllAuthors}
								getOptionLabel={(e: AuthorAPIObject) => `${e.name} ${e.plastName} ${e.mlastName}`}
								getOptionValue={(e: AuthorAPIObject) => e.id}
								setSelected={setAuthors}
							></MultiSelectWithAutocomplete>
						</div>
					</Form.Group>

					<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
						Crear texto
					</Button>
				</Form>
			</Container>
		</>
	);
}

export function NewCustomerForm() {
	return <h1>Clientes!</h1>;
}

export function NewAuthorForm({ show, setShow, reload, setReload }: any) {
	const [name, setName] = useState("");
	const [plastName, setPlastName] = useState("");
	const [mlastName, setMlastName] = useState("");

	const mutation = useMutation({
		mutationFn: newAuthor,
		onSuccess: () => {
			setReload(true);
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const requestBody: AuthorDTO = {
			name,
			plastName,
			mlastName,
		};
		setShow(false);
		mutation.mutate(requestBody as AuthorDTO);
	};

	return (
		<>
			<Container fluid>
				<Form>
					<Form.Group className="mb-3" controlId="formNameAuthor">
						<Form.Label> Nombre del autor </Form.Label>
						<Form.Control
							placeholder="Escribe el nombre del autor"
							onChange={(e) => setName(e.target.value)}
							type="text"
							required
						></Form.Control>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formPlastName">
						<Form.Label> Apellido Paterno del autor </Form.Label>
						<Form.Control
							placeholder="Escribe el apellido paterno del autor"
							onChange={(e) => setPlastName(e.target.value)}
							type="text"
							required
						></Form.Control>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formMlastName">
						<Form.Label> Apellido Materno del autor </Form.Label>
						<Form.Control
							placeholder="Escribe el apellido materno del autor"
							onChange={(e) => setMlastName(e.target.value)}
							type="text"
							required
						></Form.Control>
					</Form.Group>

					<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
						Crear Autor
					</Button>
				</Form>
			</Container>
		</>
	);
}

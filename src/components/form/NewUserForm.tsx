import { useState, useContext } from "react";
import { FormEvent } from "react";

import { Container, Form, Button, DropdownButton, Dropdown, Alert } from "react-bootstrap";

import { useMutation } from "@tanstack/react-query";

import { newUser, getAllGenders } from "../../api/api";
import { GenderDTO } from "../../api/types";
import CRUDContext from "../../hooks/CRUDContext";
import CustomDropdown from "../UI/CustomDropdown";
import ValidatedFormGroup from "../UI/FormControlValidator";

/* just for testing purposes */
function dummyGetRoles() {
	const data = [
		{
			rolu_id: 1,
			rolu_nombre: "Administrador",
		},
		{
			rolu_id: 2,
			rolu_nombre: "Cliente",
		},
		{
			rolu_id: 3,
			rolu_nombre: "Bibliotecario",
		},
	];

	return data;
}

function StaticCustomDropdown({ data, getOptionLabel, setSelectedItem, mapSelectedValue }: any) {
	const [dropdownTitle, setDropdownTitle] = useState("Seleccione una opción");

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
export function NewUserForm({ setShow }: any) {
	const [document, setDocument] = useState("");
	const [psk, setPsk] = useState("");
	const [name, setName] = useState("");
	const [plastname, setPlastname] = useState("");
	const [mlastname, setMlastname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [genderId, setGenderId] = useState<number | undefined>(undefined);
	const [roleId, setRoleId] = useState<number | undefined>(undefined);
	const [badInput, setBadInput] = useState<boolean>(false);

	const context = useContext(CRUDContext);

	const mutation = useMutation({
		mutationFn: newUser,
		onSuccess: async () => {
			context?.userCreationSuccess();
			setShow(false);
		},
		onError: async (error) => {
			context?.userCreationFailure(error);
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (roleId == null || genderId === null) {
			setBadInput(true);
			return;
		}

		const requestBody: any = {
			document,
			documentTypeId: 1,
			roleId,
			psk,
			name,
			plastname,
			mlastname,
			phoneNumber,
			genderId,
		};
		mutation.mutate(requestBody);
	};

	return (
		<>
			<Container fluid>
				<Form>
					<ValidatedFormGroup
						controlId="document"
						label="DNI"
						type="number"
						value={document}
						onChange={(e) => setDocument(e.target.value)}
						minLength={8}
						maxLength={8}
						setBadInput={setBadInput}
						placeholder="12345678"
						placeholderIsExample
						required
					/>
					<ValidatedFormGroup
						controlId="name"
						label="Nombres"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						minLength={2}
						maxLength={255}
						placeholder="Juan"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>
					<ValidatedFormGroup
						controlId="plastname"
						label="Apellido Paterno"
						type="text"
						value={plastname}
						onChange={(e) => setPlastname(e.target.value)}
						minLength={2}
						maxLength={255}
						placeholder="Vasquez"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>
					<ValidatedFormGroup
						controlId="mlastname"
						label="Apellido Materno"
						type="text"
						value={mlastname}
						onChange={(e) => setMlastname(e.target.value)}
						minLength={2}
						maxLength={255}
						placeholder="Ramos"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>

					<ValidatedFormGroup
						controlId="phoneNumber"
						label="Número de Celular"
						type="number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						minLength={9}
						maxLength={9}
						placeholder="987654321"
						setBadInput={setBadInput}
						placeholderIsExample
						required
					/>

					<Form.Group className="mb-3" controlId="formGenero">
						<div className="d-flex justify-content-between">
							<Form.Label>Género</Form.Label>
							<CustomDropdown
								qKey={["getAllTypes"]}
								qFn={getAllGenders}
								getOptionLabel={(e: GenderDTO) => e.genderName}
								setSelectedItem={setGenderId}
								mapSelectedValue={(e: GenderDTO) => e.id}
							></CustomDropdown>
						</div>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGenero">
						<div className="d-flex justify-content-between">
							<Form.Label>Rol de Usuario</Form.Label>
							<StaticCustomDropdown
								data={dummyGetRoles()}
								getOptionLabel={(e: any) => e.rolu_nombre}
								setSelectedItem={setRoleId}
								mapSelectedValue={(e: any) => e.rolu_id}
							></StaticCustomDropdown>
						</div>
					</Form.Group>

					<ValidatedFormGroup
						controlId="password"
						label="Contraseña"
						type="password"
						value={psk}
						onChange={(e) => setPsk(e.target.value)}
						minLength={8}
						maxLength={256}
						placeholder="Elige una contraseña segura"
						setBadInput={setBadInput}
						required
					/>
					{badInput && <Alert variant="danger">Algunos datos ingresados son inválidos.</Alert>}
					<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
						Registrar Usuario
					</Button>
				</Form>
			</Container>
		</>
	);
}

import { useState, useContext, useEffect } from "react";
import { FormEvent } from "react";

import { Container, Form, Button, DropdownButton, Dropdown, Alert } from "react-bootstrap";

import { useMutation } from "@tanstack/react-query";

import { newUser, getAllGenders, getAllRoles, getUserById, updateUser } from "../../api/api";
import { GenderDTO, RoleAPIObject } from "../../api/types";
import CRUDContext from "../../hooks/CRUDContext";
import CustomDropdown from "../UI/CustomDropdown";
import ValidatedFormGroup from "../UI/FormControlValidator";

type PropsForm = {
	setShow: any;
	isEditMode?: boolean;
	id?: number;
}


export function NewUserForm({ setShow, isEditMode, id }: PropsForm) {
	const [document, setDocument] = useState("");
	const [psk, setPsk] = useState("");
	const [name, setName] = useState("");
	const [plastname, setPlastname] = useState("");
	const [mlastname, setMlastname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [genderId, setGenderId] = useState<number | undefined>(undefined);
	const [roleId, setRoleId] = useState<number | undefined>(undefined);
	const [badInput, setBadInput] = useState<boolean>(false);

	const [isFetchingUser, setIsFetchingUser] = useState(false);
	const [fetchError, setFetchError] = useState<boolean>(false);

	const [roleDefaultValue, setRoleDefaultValue] = useState<RoleAPIObject>();
	const [genderDefaultValue, setGenderDefaultValue] = useState<GenderDTO>();


	const context = useContext(CRUDContext);

	useEffect(() => {
		if(isEditMode && id){
			setIsFetchingUser(true);
			getUserById(id)
			.then((data) => {
				setDocument(data.document || "");
				setName(data.name || "");
				setPlastname(data.plastName || "");
				setMlastname(data.mlastName || "");
				setPhoneNumber(data.phoneNumber || "");
				setGenderId(data.gender.id || undefined);
				setRoleId(data.roleId);
				setGenderDefaultValue(data.gender);
			})
			.catch(() => {
				setFetchError(true);
			})
			.finally(() => setIsFetchingUser(false));
		}
		}
	, [isEditMode, id]);

	const mutation = useMutation({
		mutationFn: ({ id, data }: { id?: number; data: any }) => {
			return isEditMode && id ? updateUser(id, data) : newUser(data);
		  },
		onSuccess: async () => {
			context?.toggleToast();
			context?.setToastData(
				(isEditMode) ? "El usuario se actualizó correctamente" 
				: "El usuario se ha creado exitosamente", "success");
			setShow(false);
		},
		onError: async (error) => {
			console.log(error);
			context?.toggleToast();
			context?.setToastData(
				(isEditMode) ? "No se ha pido actualizar el usuario"
				 : "No se ha podido crear el usuario", "danger");
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

		if(isEditMode)
			mutation.mutate({id: id, data: requestBody});
		else
			mutation.mutate(requestBody);
	};

	return (
		<>
		{isFetchingUser ? (
			<p>Cargando...</p>
		) : fetchError ? (
			<p>Error al cargar el usuario.</p>
		) : (
			<Container fluid>
				<Form>
					<ValidatedFormGroup
						controlId="document"
						label="DNI"
						type="text"
						dataType="number"
						value={document}
						onChange={(e) => {
							e.target.value.length <= 8 && setDocument(e.target.value);
						}}
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
						dataType="text"
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
						dataType="text"
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
						dataType="text"
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
						type="text"
						dataType="number"
						value={phoneNumber}
						onChange={(e) => {
							e.target.value.length <= 9 && setPhoneNumber(e.target.value);
						}}
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
								defaultValue={genderDefaultValue}
							></CustomDropdown>
						</div>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGenero">
						<div className="d-flex justify-content-between">
							<Form.Label>Rol de Usuario</Form.Label>
							<CustomDropdown
								qKey={["getAllRoles"]}
								qFn={getAllRoles}
								getOptionLabel={(e: RoleAPIObject) => e.role}
								setSelectedItem={setRoleId}
								mapSelectedValue={(e: RoleAPIObject) => e.id}
							></CustomDropdown>
						</div>
					</Form.Group>

					<ValidatedFormGroup
						controlId="password"
						label="Contraseña"
						type="password"
						dataType="text"
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
						{(isEditMode) ? "Actualizar Usuario" : "Registrar Usuario"}
					</Button>
				</Form>
			</Container>
	)}</>
	);
}

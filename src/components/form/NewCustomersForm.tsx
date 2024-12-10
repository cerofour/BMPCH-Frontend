import { useState, useContext, FormEvent, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

import { getAllDistricts, getAllEducationLevels, getAllGenders, getCustomerById, newCustomer, updateCustomer } from "../../api/api";

import ValidatedFormGroup from "../UI/FormControlValidator";
import CustomDropdown from "../UI/CustomDropdown";
import { DistrictAPIObject, DistrictDTO, EducationAPIObject, GenderDTO } from "../../api/types";
import CRUDContext from "../../hooks/CRUDContext";

type PropsForm = {
	setShow: any;
	isEditMode?: boolean;
	id?: number;
}

export function NewCustomerForm({ setShow, isEditMode, id }: PropsForm) {
	const [document, setDocument] = useState("");
	const [name, setName] = useState("");
	const [plastname, setPlastname] = useState("");
	const [mlastname, setMlastname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [genderId, setGenderId] = useState<number | undefined>(undefined);
	const [district, setDistrict] = useState<number | undefined>(undefined);
	const [address, setAddress] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [educationLevelId, setEducationLevelId] = useState<number | undefined>(undefined);
	const [badInput, setBadInput] = useState<boolean>(false);
	const [badInputMsg, setBadInputMsg] = useState<string>("");
	const [imageFile, setImageFile] = useState<File | undefined>(undefined);

	const [isFetchingCustomer, setIsFetchingCustomer] = useState(false);
	const [fetchError, setFetchError] = useState<boolean>(false);

	const [genderDefaultValue, setGenderDefaultValue] = useState<GenderDTO>();
	const [districtDefaultValue, setDistrictDefaultValue] = useState<DistrictAPIObject>();
	const [educationDefaultValue, setEducationDefaultValue] = useState<EducationAPIObject>();

	const context = useContext(CRUDContext);

	useEffect(() => {
		if(isEditMode && id){
			setIsFetchingCustomer(true);
			getCustomerById(id)
			.then((data) => {
				setDocument(data.user.document || "");
				setName(data.user.name || "");
				setPlastname(data.user.plastName || "");
				setMlastname(data.user.mlastName || "");
				setPhoneNumber(data.user.phoneNumber || "");
				setGenderId(data.user.gender.id || undefined);
				setDistrict(data.address.district.id || undefined);
				setAddress(data.address.address || "");
				setEmail(data.email || "");
				setEducationLevelId(data.education.id || undefined);
				setGenderDefaultValue(data.user.gender);
				setEducationDefaultValue(data.education);
				setDistrictDefaultValue(data.address.district);
			})
			.catch(() => {
				setFetchError(true);
			})
			.finally(() => setIsFetchingCustomer(false));
		}
		}
	, [isEditMode, id]);

	const mutation = useMutation({
		mutationFn: ({ id, data }: { id?: number; data: FormData }) => {
			return isEditMode && id ? updateCustomer(id, data) : newCustomer(data);
		  },
		onSuccess: async () => {
			context?.toggleToast();
			context?.setToastData(
				isEditMode ? "El cliente fue actualizado exitosamente" : 
				"El cliente, su carnet y sus credenciales de usuario se han creado exitosamente",
				"success"
			);
			setShow(false);
		},
		onError: async (_) => {
			context?.toggleToast();
			context?.setToastData(
				isEditMode ? "No se ha podido actualizar el cliente"
				 : "No se ha podido crear el usuario", "danger");
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (genderId === undefined) {
			setBadInput(true);
			setBadInputMsg("Género");
			return;
		} else if (district === undefined) {
			setBadInput(true);
			setBadInputMsg("Distrito");
			return;
		} else if (educationLevelId === undefined) {
			setBadInput(true);
			setBadInputMsg("Nivel educativo");
			return;
		}

		const customerData: any = {
			userData: {
				document,
				documentTypeId: 1,
				psk: document,
				name,
				plastname,
				mlastname,
				genderId,
				roleId: 2,
				phoneNumber,
			},
			addressData: {
				district,
				address,
			},
			educationLevelId,
			email,
		};

		const formData = new FormData();
		formData.append("customer", new Blob([JSON.stringify(customerData)], { type: "application/json" })); // Agregar el objeto JSON
		if (imageFile === undefined && !isEditMode) {
			setBadInput(true);
			return;
		}

		if(imageFile !== undefined){
			formData.append("image", imageFile);
		}

		if(isEditMode)
			mutation.mutate({id: id, data: formData})
		else
			mutation.mutate({data: formData});
	};
	return (
		<Container fluid>
			{isFetchingCustomer ? (
				<p>Cargando...</p>
			) : fetchError ? (
				<p>Error al cargar el cliente.</p>
			) : (
			<Form>
				{/* Datos del usuario */}
				<ValidatedFormGroup
					controlId="document"
					label="DNI"
					type="text"
					dataType="number"
					value={document}
					onChange={(e) => setDocument(e.target.value)}
					minLength={8}
					maxLength={8}
					placeholder="12345678"
					setBadInput={setBadInput}
					placeholderIsExample
					required
				/>
				<Row>
					<Col xs={12} md={4}>
						<ValidatedFormGroup
							controlId="name"
							label="Nombres"
							type="text"
							dataType="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							minLength={2}
							maxLength={255}
							placeholder="Juan"
							setBadInput={setBadInput}
							placeholderIsExample
							required
						/>
					</Col>
					<Col xs={12} md={4}>
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
					</Col>
					<Col xs={12} md={4}>
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
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={6}>
						<ValidatedFormGroup
							controlId="phoneNumber"
							label="Número de Celular"
							type="text"
							dataType="number"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							minLength={9}
							maxLength={9}
							placeholder="987654321"
							setBadInput={setBadInput}
							placeholderIsExample
							required
						/>
					</Col>
					<Col xs={12} md={6}>
						<ValidatedFormGroup
							controlId="email"
							label="Correo Electrónico"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="jvasquesr@correo.com"
							setBadInput={setBadInput}
							placeholderIsExample
							required
						/>
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={6}>
						<Form.Group className="mb-3" controlId="formGenero">
							<Form.Label>Género</Form.Label>
							<CustomDropdown
								qKey={["getAllTypes"]}
								qFn={getAllGenders}
								getOptionLabel={(e: GenderDTO) => e.genderName}
								setSelectedItem={setGenderId}
								mapSelectedValue={(e: GenderDTO) => e.id}
								defaultValue={(isEditMode) ? genderDefaultValue : null}
							></CustomDropdown>
						</Form.Group>
					</Col>
					<Col xs={12} md={6}>
						<Form.Group className="mb-3" controlId="formDistrito">
							<Form.Label>Distrito</Form.Label>
							<CustomDropdown
								qKey={["getAllDistricts"]}
								qFn={getAllDistricts}
								getOptionLabel={(e: DistrictDTO) => e.districtName}
								setSelectedItem={setDistrict}
								mapSelectedValue={(e) => e.id}
								defaultValue={districtDefaultValue}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6}>
						<Form.Group className="mb-3" controlId="formDistrito">
							<Form.Label>Nivel Educativo</Form.Label>
							<CustomDropdown
								qKey={["getAllEducationLevels"]}
								qFn={getAllEducationLevels}
								getOptionLabel={(e: EducationAPIObject) => e.educationName}
								setSelectedItem={setEducationLevelId}
								mapSelectedValue={(e) => e.id}
								defaultValue={educationDefaultValue}
							/>
						</Form.Group>
					</Col>
				</Row>

				<ValidatedFormGroup
					controlId="address"
					label="Dirección"
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Av. Coloniales de Zaña 341"
					minLength={8}
					maxLength={64}
					setBadInput={setBadInput}
					placeholderIsExample
					required
				/>
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Subir Imagen</Form.Label>
					<Form.Control
						type="file"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setImageFile(e.target.files?.[0] || undefined);
						}}
						required={!isEditMode} // check
					/>
					<Form.Control.Feedback>Por favor adjunta una imagen del cliente.</Form.Control.Feedback>
				</Form.Group>

				{badInput && <Alert variant="danger">Algunos datos ingresados son inválidos: {badInputMsg}.</Alert>}
				<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
					{(isEditMode) ? "Actualizar Cliente" : "Registrar Cliente"}
				</Button>
			</Form>
	)}</Container>
	);
}

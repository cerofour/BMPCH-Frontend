import { useState, useContext, FormEvent } from "react";

import { useMutation } from "@tanstack/react-query";

import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

import { getAllDistricts, getAllEducationLevels, getAllGenders, newCustomer } from "../../api/api";

import ValidatedFormGroup from "../UI/FormControlValidator";
import CustomDropdown from "../UI/CustomDropdown";
import { DistrictDTO, EducationAPIObject, GenderDTO } from "../../api/types";
import CRUDContext from "../../hooks/CRUDContext";

export function NewCustomerForm({ setShow }: any) {
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

	const context = useContext(CRUDContext);

	const mutation = useMutation({
		mutationFn: newCustomer,
		onSuccess: async () => {
			context?.toggleToast();
			context?.setToastData(
				"El cliente, su carnet y sus credenciales de usuario se han creado exitosamente",
				"success"
			);
			setShow(false);
		},
		onError: async (_) => {
			context?.toggleToast();
			context?.setToastData("No se ha podido crear el usuario", "danger");
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
		if (imageFile === undefined) {
			setBadInput(true);
			return;
		}
		formData.append("image", imageFile);

		mutation.mutate(formData);
	};
	return (
		<Container fluid>
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
						required
					/>
					<Form.Control.Feedback>Por favor adjunta una imagen del cliente.</Form.Control.Feedback>
				</Form.Group>

				{badInput && <Alert variant="danger">Algunos datos ingresados son inválidos: {badInputMsg}.</Alert>}
				<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
					Registrar Cliente
				</Button>
			</Form>
		</Container>
	);
}

import { useState, useContext, FormEvent } from "react";

import { useMutation } from "@tanstack/react-query";

import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";

import CRUDContext from "../../hooks/CRUDContext";

import { getAllEducationLevels, getAllDistricts, makeClient } from "../../api/api";
import { EducationAPIObject, DistrictDTO, UserToClientDTO } from "../../api/types";

import ValidatedFormGroup from "../UI/FormControlValidator";
import CustomDropdown from "../UI/CustomDropdown";

export default function UserToClientForm({ setShow, userId }: any) {
	const [email, setEmail] = useState<string>("");
	const [educationLevelId, setEducationLevelId] = useState(0);
	const [district, setDistrict] = useState(0);
	const [imageFile, setImageFile] = useState<File | undefined>(undefined);
	const [address, setAddress] = useState("");
	const [badInput, setBadInput] = useState<boolean>(true);
	const [badInputMsg, setBadInputMsg] = useState<string>("");
	const context = useContext(CRUDContext);

	const mutation = useMutation({
		mutationFn: makeClient,
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

		if (district === 0) {
			setBadInput(true);
			setBadInputMsg("Distrito");
			return;
		} else if (educationLevelId === 0) {
			setBadInput(true);
			setBadInputMsg("Nivel educativo");
			return;
		}

		const customerData: UserToClientDTO = {
			id: userId,
			addressDTO: {
				district,
				address,
			},
			email,
			educationLevel: educationLevelId,
		};

		const formData = new FormData();
		formData.append("data", new Blob([JSON.stringify(customerData)], { type: "application/json" })); // Agregar el objeto JSON
		if (imageFile === undefined) {
			setBadInput(true);
			return;
		}
		formData.append("image", imageFile);

		mutation.mutate(formData);
	};

	console.log(`el id es ${userId}`);

	return (
		<Container fluid>
			<Form>
				<Row>
					<Col xs={12} md={12}>
						<ValidatedFormGroup
							controlId="email"
							label="Correo Electrónico"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="micorreo@correo.com"
							setBadInput={setBadInput}
							placeholderIsExample
							required
						/>
					</Col>
				</Row>
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
				<Row>
					<Col xs={12} md={4}>
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
					<Col xs={12} md={8}>
						<ValidatedFormGroup
							controlId="address"
							label="Dirección"
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Av. AAA #XYZ"
							minLength={8}
							maxLength={64}
							setBadInput={setBadInput}
							placeholderIsExample
							required
						/>
					</Col>
				</Row>

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

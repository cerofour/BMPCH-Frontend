import { useState, FormEvent, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

import ValidatedFormGroup from "../UI/FormControlValidator";
import CustomDropdown from "../UI/CustomDropdown";

import { getAllUsers, getAllCodes, getAllLoanTypes, getAllLoanStatuses, newLoan, getAllTexts, getCodesBybaseCode } from "../../api/api";
import { UserAPIObject, CodeAPIObject, LoanTypeAPIObject, LoanStatusAPIObject, LoanDTO, TextAPIObject } from "../../api/types";
import CRUDContext from "../../hooks/CRUDContext";
import SelectWithAutoComplete from "../SelectWithAutoComplete";

export function NewLoanForm({ setShow }: any) {
	const [idUser, setIdUser] = useState<number | undefined>();
	const [idCode, setIdCode] = useState<number | undefined>();
	const [idTypeLoan, setIdTypeLoan] = useState<number | undefined>();
	const [idStatusLoan, setIdStatusLoan] = useState<number | undefined>();
	const [baseCode, setbaseCode] = useState<string | undefined>();
	const [initialDate, setInitialDate] = useState(new Date());
	const [scheduledDate, setScheduledDate] = useState(new Date());
	const [badInput, setBadInput] = useState<boolean>(false);

	const context = useContext(CRUDContext);

	const mutation = useMutation({
		mutationFn: newLoan,
		onSuccess: () => {
			context?.toggleToast();
			context?.setToastData("Préstamo creado exitosamente.", "success");
			setShow(false);
		},
		onError: () => {
			context?.toggleToast();
			context?.setToastData("No se ha podido crear el préstamo.", "danger");
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (!idUser || !idCode || !idTypeLoan || !idStatusLoan) {
			setBadInput(true);
			return;
		}

		const requestBody: LoanDTO = {
			idUser,
			idCode,
			idTypeLoan,
			idStatusLoan,
			initialDate,
			scheduledDate,
		};

		setShow(false);
		mutation.mutate(requestBody);
	};

	return (
		<>
			<Container fluid>
				<Form>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Usuario</Form.Label>
								<SelectWithAutoComplete 
									qKey={["getAllUsers"]}
									qFn={getAllUsers}
									getOptionLabel={(e: UserAPIObject) => `${e.name} ${e.plastName} ${e.mlastName} - DNI: ${e.document}`}
									getOptionValue={(e: UserAPIObject) => e.userId}
									setSelected={setIdUser}
									isMulti={false}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Recurso Textual</Form.Label>
								<SelectWithAutoComplete 
									qKey={["getAllTexts"]}
									qFn={getAllTexts}
									getOptionLabel={(e: TextAPIObject) => `${e.title}`}
									getOptionValue={(e: TextAPIObject) => e.baseCode}
									setSelected={setbaseCode}
									isMulti={false}
								/>
							</Form.Group>
						</Col>
					</Row>
					{ (baseCode !== undefined) ? 
					(<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Código</Form.Label>
								<CustomDropdown
									qKey={["getCodesBybaseCode"]}
									qFn={() => {return getCodesBybaseCode(baseCode)}}
									getOptionLabel={(e: CodeAPIObject) => `${e.baseCode}-${e.exemplaryCode}`}
									setSelectedItem={setIdCode}
									mapSelectedValue={(e: CodeAPIObject) => e.id}
								></CustomDropdown>
							</Form.Group>
						</Col>
					</Row>) : ("")}

					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Tipo de Préstamo</Form.Label>
								<CustomDropdown
									qKey={["getAllLoanTypes"]}
									qFn={getAllLoanTypes}
									getOptionLabel={(e: LoanTypeAPIObject) => e.type}
									setSelectedItem={setIdTypeLoan}
									mapSelectedValue={(e: LoanTypeAPIObject) => e.id}
								></CustomDropdown>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Estado del Préstamo</Form.Label>
								<CustomDropdown
									qKey={["getAllLoanStatuses"]}
									qFn={getAllLoanStatuses}
									getOptionLabel={(e: LoanStatusAPIObject) => e.name}
									setSelectedItem={setIdStatusLoan}
									mapSelectedValue={(e: LoanStatusAPIObject) => e.id}
								></CustomDropdown>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group className="mb-3" controlId="initialDate">
						<Form.Label>Fecha Inicial</Form.Label>
						<Form.Control
							onChange={(e) => setInitialDate(new Date(e.target.value))}
							datatype="date"
							type="date"
							required
						></Form.Control>
					</Form.Group>

					<Form.Group className="mb-3" controlId="scheduledDate">
						<Form.Label>Fecha Programada</Form.Label>
						<Form.Control
							onChange={(e) => setScheduledDate(new Date(e.target.value))}
							datatype="date"
							type="date"
							required
						></Form.Control>
					</Form.Group>

					{badInput && <Alert variant="danger">Algunos datos ingresados son inválidos.</Alert>}
					<Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
						Crear Préstamo
					</Button>
				</Form>
			</Container>
		</>
	);
}

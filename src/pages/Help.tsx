import { Stack } from "react-bootstrap";

function Help() {
	return (
		<>
			<div className="help-container">
				<div style={{backgroundColor: '#fff', padding: '20px',}}>
					<Stack>
						<div className="align-items-start">
							<h1>Pasos para obtener tu carnet</h1>
						</div>
						<div>
							<h3>Paso 1:</h3>
							<p>Realiza el pago</p>
						</div>
					</Stack>
				</div>
			</div>
		</>
	);
}

export default Help;

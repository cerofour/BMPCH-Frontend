import { Card, CardBody } from "react-bootstrap";

export default function PanelCard({ children }: any) {
	return (
		<Card>
			<CardBody>{children}</CardBody>
		</Card>
	);
}

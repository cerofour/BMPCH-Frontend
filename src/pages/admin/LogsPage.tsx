import { Container, Tabs } from "react-bootstrap";

import LogsTable from "../../components/tables/LogsTable";
import { generateAdminTabs, TabsData } from "../../components/Utils";

export default function LogsPage() {
	const tabsData: TabsData[] = [
		{
			tabKey: "logs",
			tabName: "Logs",
			tabTitle: "Ver Logs del Sistema",
			useButton: false,
			reload: false,
			setReload: (_) => false,
			searchBarPlaceholder: "Buscar log por detalle",
			tableGenerator: (filterFn: ((item: string) => boolean) | undefined) => <LogsTable filterFn={filterFn} />, // JSX.Element
		},
	];

	return (
		<>
			<div className="my-4">
				<h1>Módulo de Administración de Préstamos</h1>
			</div>
			<Container>
				<Tabs defaultActiveKey="logs" id="uncontrolled-tab-example" className="mb-3">
					{generateAdminTabs(tabsData)}
				</Tabs>
			</Container>
		</>
	);
}

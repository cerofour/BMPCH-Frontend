import { AddressAPIObject, AuthorAPIObject, UserAPIObject } from "../api/types";

import { Button, Tab } from "react-bootstrap";

import { CustomModal } from "./CustomModals";
import PanelCard from "./UI/PanelCard";

export function firstN(src: string, n: number): string {
	return src.slice(0, n) + "...";
}

export function prettifyAddress(address: AddressAPIObject): string {
	return `${address.address}, ${address.district.districtName}, ${address.district.province.provinceName}, ${address.district.province.region.regionName}, ${address.district.province.region.country.countryName}`;
}

export function commaSeparatedAuthors(authors: AuthorAPIObject[]): string {
	return authors
		.map((author: AuthorAPIObject) => `${author.name} ${author.plastName} ${author.mlastName}`)
		.join(", ");
}

export function prettifyUserNames(user: UserAPIObject): string {
	return `${user.plastName} ${user.mlastName}, ${user.name}`;
}

export function buildTableContent<T extends Object>(
	colspan: number,
	isLoading: boolean,
	isError: boolean,
	data: T[] | undefined,
	mapFn: (item: T, index: number) => JSX.Element,
	predicate?: (item: T) => boolean
) {
	if (isLoading)
		return (
			<tr>
				<td colSpan={colspan}>Cargando recursos...</td>
			</tr>
		);

	if (isError)
		return (
			<tr>
				<td colSpan={colspan}>Error al cargar recursos.</td>
			</tr>
		);

	const filteredData = predicate ? data?.filter(predicate) : data;

	return filteredData?.map(mapFn);
}

export type TabsData = {
	tabKey: string;
	tabName: string;
	tabTitle: string;
	buttonTitle: string;
	showModal: boolean;
	setShowModal: (x: boolean) => void;
	modalTitle: string;
	tabForm: ({ setShow }: any) => JSX.Element;
	reload: boolean;
	setReload: React.Dispatch<React.SetStateAction<boolean>>;
	table: JSX.Element; // a <Table>
};

export function generateAdminTabs(tabsData: TabsData[]) {
	return tabsData.map(
		({
			tabKey,
			tabName,
			tabTitle,
			buttonTitle,
			showModal,
			setShowModal,
			modalTitle,
			tabForm,
			reload,
			setReload,
			table,
		}) => (
			<Tab eventKey={tabKey} title={tabName} key={tabKey}>
				<PanelCard>
					<div className="my-2 d-flex justify-content-between">
						<h2>
							<b>{tabTitle}</b>
						</h2>
						<Button onClick={() => setShowModal(true)}>{buttonTitle}</Button>
					</div>
					<CustomModal
						show={showModal}
						setShow={setShowModal}
						title={modalTitle}
						form={tabForm}
						reload={reload}
						setReload={setReload}
					/>
					{table}
				</PanelCard>
			</Tab>
		)
	);
}

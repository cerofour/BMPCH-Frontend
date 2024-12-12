import { FormEvent, useState } from "react";
import { AddressAPIObject, AuthorAPIObject, UserAPIObject } from "../api/types";

import { Button, Tab, Row, Col } from "react-bootstrap";

import { CustomModal } from "./CustomModals";
import PanelCard from "./UI/PanelCard";
import { SearchBar } from "./UIElements";

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
	filterFn?: (item: string) => boolean,
	getFilterKey?: (item: T) => string,
	comparator?: (a: T, b: T) => number
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

	let processedData = data;

	if (filterFn && getFilterKey) processedData = processedData?.filter((e) => filterFn(getFilterKey(e)));

	if (comparator) processedData = processedData?.sort(comparator);

	return processedData?.map(mapFn);
}

export type TabsData = {
	tabKey: string;
	tabName: string;
	tabTitle: string;
	useButton: boolean;
	buttonTitle?: string;
	showModal?: boolean;
	setShowModal?: (x: boolean) => void;
	modalTitle?: string;
	tabForm?: ({ setShow }: any) => JSX.Element;
	reload: boolean;
	setReload: React.Dispatch<React.SetStateAction<boolean>>;
	searchBarPlaceholder: string;
	tableGenerator: (filterFn: ((item: string) => boolean) | undefined) => JSX.Element;
};

export function generateAdminTabs(tabsData: TabsData[]) {
	const [filterFn, setFilterFn] = useState<((item: string) => boolean) | undefined>(undefined);
	const buildFilterFn = (e: FormEvent) => {
		let val = "";
		e.preventDefault();
		const form = e.currentTarget.closest("form");
		if (form) {
			const input = form.querySelector<HTMLInputElement>("input[type='text']");
			if (input) val = input.value;
		}

		setFilterFn(val ? () => (item: string) => item.toLowerCase().includes(val.toLowerCase()) : undefined);
	};

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
			searchBarPlaceholder,
			tableGenerator,
			useButton,
		}) => (
			<Tab eventKey={tabKey} title={tabName} key={tabKey}>
				<PanelCard>
					<Row>
						<Col xs={useButton ? 10 : 12}>
							<h2>
								<b>{tabTitle}</b>
							</h2>
						</Col>
						{useButton && (
							<Col xs={2}>
								<Button onClick={() => setShowModal && setShowModal(true)} className="w-100">
									{buttonTitle}
								</Button>
							</Col>
						)}
					</Row>
					<SearchBar
						onClick={buildFilterFn}
						placeholder={searchBarPlaceholder}
						buttonText="Buscar"
					></SearchBar>
					{useButton && modalTitle && tabForm && setShowModal && showModal && (
						<CustomModal
							show={showModal}
							setShow={setShowModal}
							title={modalTitle}
							form={tabForm}
							reload={reload}
							setReload={setReload}
						/>
					)}
					{tableGenerator(filterFn)}
				</PanelCard>
			</Tab>
		)
	);
}

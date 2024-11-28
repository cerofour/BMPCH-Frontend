import { AddressAPIObject, AuthorAPIObject } from "../api/types";

export function firstN(src: string, n: number): string {
	return src.slice(0, n) + "...";
}

export function prettifyAddress(address: AddressAPIObject): string {
	return `${address.address}, ${address.district.districtName}, ${address.district.province.provinceName}, ${address.district.province.region.regionName}, ${address.district.province.region.country.countryName}`
}

export function commaSeparatedAuthors(authors: AuthorAPIObject[]): string {
	return authors.map((author: AuthorAPIObject) =>
		`${author.name} ${author.plastName} ${author.mlastName}`
	).join(',');
}
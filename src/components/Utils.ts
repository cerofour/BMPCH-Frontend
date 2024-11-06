import { AddressAPIObject } from "../api/types";

export function firstN(src: string, n: number) {
	return src.slice(0, n) + "...";
}

export function prettifyAddress(address: AddressAPIObject) {
	return `${address.address}, ${address.district.districtName}, ${address.district.province.provinceName}, ${address.district.province.region.regionName}, ${address.district.province.region.country.countryName}`
}
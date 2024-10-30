import axios from "axios";

export type UserAPIObject = {
  userId: number;
  roleId: number;
  documentTypeId: number;
  document: string;
  psk: string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  authorities: string[];
  username: string;
  password: string;
};

export type UserLogin = {
	document: string;
	psk: string;
};

export type UserLoginResponse = {
	token: string;
	expiration: number;
}

export type EditorialAPIObject = {
	id: number;
	name: string;
}

export type TextTypeAPIObject = {
	typeId: number;
	typename: string;
}

export type TextAPIObject = {
	id: number;
  title: string;
  publicationDate: Date,
  pages: number,
  edition: number,
  volume: number,
  editorial: EditorialAPIObject,
  type: TextTypeAPIObject,
};

export type TextDTO = {
  title: string;
  publicationDate: Date,
  numPages: number,
  edition: number,
  volume: number,
  editorialName: string,
  textType: string,
};

export type UserDTO = {
	roleId: number;
	documentTypeId: number;
	document: string;
	psk: string;
}

export type RolesAPIObject = {
	id: number;
	role: string;
}

export type DocumentTypesAPIObject = {
	id: number;
	type: string;
}

export type AuthorsAPIObject = {
	id: number;
	plastname: string;
	mlastname: string;
}

const DOMAIN = "http://144.22.63.67:8080";
const API_PREFFIX = '/api/v1';

export const api = axios.create({
	baseURL: API_PREFFIX,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	}});

const loginApi = axios.create({
	baseURL: DOMAIN,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	}});

export async function getAllUsers(): Promise<UserAPIObject[]> {
	const response = await api.get('/users/');
	return response.data;
}

export async function getMe(): Promise<UserAPIObject> {
	const response = await api.get('/users/me');
	return response.data;
}

export async function getAllTypes(): Promise<TextTypeAPIObject[]> {
	const response = await api.get("/text_types/")
	return response.data;
}

export async function getAllEditorials(): Promise<EditorialAPIObject[]> {
	const response = await api.get("/editorial/");
	return response.data;
}

export async function getAllTexts(): Promise<TextAPIObject[]> {
	const response = api.get("/texts/");
	return (await response).data;
}

export async function newText(data: TextDTO) {
	const response = api.post("/texts/", data);
	return (await response).data;
}

export async function newUser(data: UserDTO) {
	const response = api.post("/auth/signup", data);
	return (await response).data;
}

export async function getAllDocumentTypes() {
	const response = api.get("/document_types/");
	return (await response).data;
}

export async function getAllRoles() {
	const response = api.get("/roles/");
	return (await response).data;
}

export async function getAllAuthors() {
	const response = await api.get("/authors/");
	return (await response).data;
}

export async function getAuthor (id: number) {
	const response = await api.get(`/authors/get?id=${id}`);
	return (await response).data;
}

export async function sendLoginCredentials(data: UserLogin): Promise<UserLoginResponse> {
	const response = await loginApi.post("/auth/login", data);
	return response.data;
}

export async function deleteUser(id: number): Promise<void> {
	const response = await api.delete(`/users/delete?id=${id}`);
	return response.data;
}

export async function deleteText(id: number): Promise<void> {
	const response = await api.delete(`/texts/delete?id=${id}`);
	return response.data;
}
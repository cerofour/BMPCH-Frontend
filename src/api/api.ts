import axios from "axios";

import {
	UserAPIObject, 
	TextTypeAPIObject, 
	EditorialAPIObject,
	TextAPIObject,
	TextDTO,
	UserLogin,
	UserLoginResponse,
	AuthorAPIObject,
	CustomerAPIObject,
	AuthorDTO
} from "./types";

const DOMAIN = "http://144.22.63.67:8080";
const API_PREFFIX = '/api/v1';

export const api = axios.create({
	baseURL: API_PREFFIX,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	}});

export const loginApi = axios.create({
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

export async function getText(textId: number): Promise<TextAPIObject> {
	const response = await api.get("/texts/get?id=" + textId);
	return response.data;
}

export async function getAllAuthors(): Promise<AuthorAPIObject[]> {
	const response = await api.get("/authors/");
	return response.data;
}

export async function getAllCustomers(): Promise<CustomerAPIObject[]> {
	const response = await api.get("/customers/");
	return response.data;
}

export async function newText(data: TextDTO) {
	const response = await api.post("/texts/", data);
	return response.data;
}

export async function newUser(userDto: any) {
	const response = loginApi.post("/auth/signup", userDto);
	return (await response).data;
}

export async function newAuthor(authorDto: AuthorDTO) {
	const response = api.post("/authors/", authorDto);
	return (await response).data;
}

export async function newResource(data: TextAPIObject) {
	const response = api.post("/texts/", data);
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

export async function deleteAuthor(id: number): Promise<void> {
	const response = await api.delete(`/authors/delete?id=${id}`);
	return response.data;
}

export async function deleteCustomer(id: number): Promise<void> {
	const response = await api.delete(`/???/delete?id=${id}`);
	return response.data;
}
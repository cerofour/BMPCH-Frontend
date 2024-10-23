import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export type BookAPIObject = {
  id: number;
  title: string;
  publication_date: string;
  stock: number;
  pages: number;
  edition: number;
  volume: number;
  type: { id: number; text_type: string };
  editorial: { id: number; editorial: string };
};

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
  authorities: string[]; // Assuming it's an array of strings, adjust as needed
  username: string;
  password: string;
};

export type UserLogin = {
	document: string;
	psk: string;
};

export type UserLoginResponse = {
	jwtToken: string;
	expiration: number;
}

const DOMAIN = "http://144.22.63.67:8080";
const API_PREFFIX = '/api/v1';

const JWTToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MzI2NjI2NyIsImlhdCI6MTcyOTY0MjE2OCwiZXhwIjoxNzI5NjQ1NzY4fQ.qps1oYU3r9YRpCJI-92BxGcx0-UU5dWW21gz04uXBnk";

const buildLink = (endpoint: string) => {
	return DOMAIN + API_PREFFIX + endpoint;
}

const loginLink = (endpoint: string) => {
	return DOMAIN + endpoint;
}

const api = axios.create({
		baseURL: DOMAIN + API_PREFFIX,
		headers: {
			"Authorization": "Bearer " + JWTToken,
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
	}
);

export async function getAllUsers(): Promise<UserAPIObject[]> {
	const response = await api.get('/users/');
	return response.data;
}

export type EditorialAPIObject = {
	id: number;
	name: string;
}

export type TextTypeAPIObject = {
	typeId: number;
	typename: string;
}

export async function getAllTypes(): Promise<TextTypeAPIObject[]> {
	const response = await api.get("/text_types/")
	return response.data;
}

export async function getAllEditorials(): Promise<EditorialAPIObject[]> {
	const response = await api.get("/editorial/");
	return response.data;
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

export async function getAllTexts(): Promise<TextAPIObject[]> {
	const response = api.get("/texts/");
	return (await response).data;
}

export async function newText(data: TextDTO) {
	const response = api.post("/texts/new", data);
	return (await response).data;
}
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

const JWTToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MzI2NjI2NyIsImlhdCI6MTcyOTQ2NjgyOCwiZXhwIjoxNzI5NDcwNDI4fQ.003tnRukwM9ocMKZLSTm5TKgCPm_TRd1MWDypATqWZ8";

const buildLink = (endpoint: string) => {
	return DOMAIN + API_PREFFIX + endpoint;
}

const loginLink = (endpoint: string) => {
	return DOMAIN + endpoint;
}

const api = axios.create({
		method: "GET",
		baseURL: DOMAIN + API_PREFFIX,
		headers: {
			"Authorization": "Bearer " + JWTToken,
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
	}
);

export async function getAllUsers(): Promise<UserAPIObject[]> {
	const response = await api.get('/users');
	return response.data;
}

//export default api;
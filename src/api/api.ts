import axios from "axios";

import {
	UserAPIObject, 
	TextTypeAPIObject, 
	EditorialAPIObject,
	TextAPIObject,
	UserLogin,
	UserLoginResponse,
	AuthorAPIObject,
	CustomerAPIObject,
	AuthorDTO,
	GenderDTO,
	DistrictDTO,
	EducationAPIObject,
	CodeAPIObject,
	LoanAPIObject,
	LoanStatusAPIObject,
	LoanTypeAPIObject,
	//RoleDTO,
	LogAPIObject,
	LoanDTO,
	EditorialDTO,
	RoleAPIObject,
	TextDTO,
} from "./types";

const DOMAIN = "http://144.22.63.67:8080";
const API_PREFFIX = '/api/v1';

export const api = axios.create({
	baseURL: DOMAIN + API_PREFFIX,
});

export const loginApi = axios.create({
	baseURL: DOMAIN,
	headers: {
		"Accept": "application/json",
	}});

export function textImageSrc(endpoint: string) {
	return DOMAIN + endpoint;
}

export async function getAllUsers(): Promise<UserAPIObject[]> {
	const response = await api.get('/users/');
	return response.data;
}

export async function getUserById(id: number): Promise<UserAPIObject> {
	const response = await api.get(`/users/get?id=${id}`)
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

export async function getAllRoles(): Promise<RoleAPIObject[]> {
	const response = api.get("/roles/");
	return (await response).data;
}

export async function getRoleById(id: number): Promise<RoleAPIObject> {
	const response = api.get("/roles/get?id="+id);
	return (await response).data;
}

export async function getAllGenders(): Promise<GenderDTO[]> {
	const response = api.get("/genders/");
	return (await response).data;
}

export async function getText(textId: number): Promise<TextAPIObject> {
	const response = await api.get("/texts/get?id=" + textId);
	return response.data;
}

export const fetchTextImage = async (id: number) => {
  const response = await api.get(`/image/text/${id.toString()}`, {
    responseType: "blob",
  });
  return URL.createObjectURL(response.data);
};

export const fetchUserImage = async (document: string) => {
  const response = await api.get(`/image/customer/${document}`, {
    responseType: "blob",
  });
  return URL.createObjectURL(response.data);
};

export async function getAllAuthors(): Promise<AuthorAPIObject[]> {
	const response = await api.get("/authors/");
	return response.data;
}

export async function getAllCustomers(): Promise<CustomerAPIObject[]> {
	const response = await api.get("/customers/");
	return response.data;
}

export async function getCustomerById(id: number): Promise<CustomerAPIObject> {
	const response = await api.get(`/customers/get?id=${id}`)
	return response.data;
}

export async function getAllDistricts(): Promise<DistrictDTO[]> {
	const response = await api.get("/districts/");
	return response.data;
}

export async function getAllEducationLevels(): Promise<EducationAPIObject[]> {
	const response = await api.get("/educations/");
	return response.data;
}

export async function getAllCodes(): Promise<CodeAPIObject[]> {
	const response = await api.get("/text_codes/");
	return response.data;
}

export async function getCodesBybaseCode(baseCode: string): Promise<CodeAPIObject[]> {
	const response = await api.get(`/text_codes/get?baseCode=${baseCode}`);
	return response.data;
}

export async function getAvailableCodesBybaseCode(baseCode: string): Promise<CodeAPIObject[]> {
	const response = await api.get(`/text_codes/get_available?baseCode=${baseCode}`);
	return response.data;
}

export async function getAllLoans(): Promise<LoanAPIObject[]> {
	const response = await api.get("/loans/");
	return response.data;
}

export async function getAllLoanTypes(): Promise<LoanTypeAPIObject[]> {
	const response = await api.get("/loan_types/");
	return response.data;
}
export async function getAllLoanStatuses(): Promise<LoanStatusAPIObject[]> {
	const response = await api.get("/loan_status/");
	return response.data;
}

export async function getAllLogs(): Promise<LogAPIObject[]>  {
	const response = await api.get("/logs/");
	//console.log(response.data[0].fec instanceof String);
	return response.data;
}

export async function makeClient(data: FormData) {
	const response = await api.post(`/customers/user_to_client`, data);
	return response.data;
}

export async function newEditorial(data: EditorialDTO) {
	const response = await api.post("/editorial/new", data);
	return response.data;
}

export async function getAuthorById(id: number, ): Promise<AuthorAPIObject> {
	const response = await api.get("/authors/get?id="+id);
	return response.data;
}

export async function updateAuthor(id: number, authorDto: AuthorDTO): Promise<AuthorAPIObject> {
	const response = await api.put("/authors/"+id, authorDto);
	return response.data;
}

export async function updateUser(id: number, userDto: any){
	const response = await api.post("/users/update/"+id, userDto);
	return response.data;
}

export async function updateText(id: number, textDto: TextDTO){
	const response = await api.put("/texts/"+id, textDto);
	return response.data;
}

export async function newText(data: FormData) {
	const response = await api.post("/texts/", data);
	return response.data;
}

export async function newLoan(data: LoanDTO) {
	const response = await api.post("/loans/", data);
	return response.data;
}

export async function setLoanStatus(id: number, status: number) {
	const response = await api.put(`/loans/${id}/status?status=${status}`)
	return response.data;
}

// TODO: FIX TYPING
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


// TODO: FIX TYPING
export async function newCustomer(data: FormData) {
	const response = api.post("/customers/", data);
	return (await response).data;
}

export async function updateCustomer(id: number, data: FormData) {
	const response = api.put("/customers/"+id, data);
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
	const response = await api.delete(`/customer/delete?id=${id}`);
	return response.data;
}

export async function deleteEditorial(name: string): Promise<void> {
	const response = await api.delete(`/editorial/delete/${name}`);
	return response.data;
}
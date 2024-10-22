import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { useLocalStorage } from "./useLocalStorage";
import { UserLoginResponse } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {
	const [jwtToken, setJwtToken] = useLocalStorage("jwt-token", null);
	const [jwtTokenExpiration, setJwtTokenExpiration] = useLocalStorage("jwt-token-expiration", null);
	const navigate = useNavigate();

	const isAuthExpired = async () => new Date(jwtTokenExpiration) < new Date();

	const login = async (data: UserLoginResponse) => {
		setJwtToken(data.jwtToken);
		setJwtTokenExpiration(new Date(new Date().getTime() + data.expiration));
	};

	const logout = async () => {
		setJwtToken(null);
		setJwtTokenExpiration(null);
		navigate("/");
	};

	const value = useMemo(() => ({ jwtToken, jwtTokenExpiration, isAuthExpired, login, logout }), [jwtToken]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

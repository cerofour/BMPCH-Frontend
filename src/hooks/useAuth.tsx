import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { api, loginApi } from "../api/api";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string) => void;
  authenticated: () => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const tokenKey = "jwtToken";

const AuthProvider = ({ children }: any) => {
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem(tokenKey)
  );

  const setToken = (token: string | null) => {
    setToken_(token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(tokenKey);
    delete api.defaults.headers.common["Authorization"]; // Remove token from headers
  };

  const authenticated = (): boolean => {
    if (token === null){console.log("token null");return false;}

    const decoded: any = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      loginApi.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem(tokenKey, token);  
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem(tokenKey);
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      authenticated,
      logout,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Logout() {
	const { logout } = useAuth();

	logout();

	return <Navigate to="/login" state={{ from: "/" }} />;
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: any) {
	const auth = useAuth();

	console.log(auth.jwtToken);

	if (!auth.jwtToken) {
		// user is not authenticated
		return <Navigate to="/login" />;
	}
	return children;
}

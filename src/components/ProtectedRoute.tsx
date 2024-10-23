import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: any) {
	const { authenticated } = useAuth();

	const location = useLocation();

	// Check if the user is authenticated
	if (!authenticated()) {
		// If not authenticated, redirect to the login page
		return <Navigate to="/login" state={{ from: location }} />;
	}

	// If authenticated, render the child routes
	return children;
}

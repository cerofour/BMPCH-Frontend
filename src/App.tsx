import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Users from "./pages/Users";
import Catalogue from "./pages/Catalogue";
import Help from "./pages/Help";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import axios from "axios";

function App() {
	/* Protected Routes

						<Route
							path="users"
							element={
								<ProtectedRoute>
									<Users />
								</ProtectedRoute>
							}
						/>
						*/
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					{/* Routes that use the layout */}
					<Route path="/" element={<Layout />}>
						<Route index element={<Login />} />
						<Route path="login" element={<Login />} />
						<Route path="usuarios" element={<Users />} />
						<Route path="catalogo" element={<Catalogue />} />
						<Route path="ayuda" element={<Help />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}

/*
function App() {
	const request = axios({
		method: "GET",
		url: "http://localhost:8080/api/v1/users",
		headers: {
			Authorization: JWTToken,
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((response) => console.log(response))
		.catch((error) => console.log("ERROR: " + error));
}
*/

export default App;

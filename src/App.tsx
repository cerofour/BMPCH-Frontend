import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Catalogue from "./pages/Catalogue";
import Help from "./pages/Help";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./hooks/useAuth";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router>
					<Routes>
						{/* Routes that use the layout */}
						<Route path="/" element={<Layout />}>
							<Route index element={<Login />} />
							<Route path="login" element={<Login></Login>} />
							<Route
								path="catalogo"
								element={
									<ProtectedRoute>
										<Catalogue />
									</ProtectedRoute>
								}
							/>
							<Route
								path="perfil"
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>
							<Route path="ayuda" element={<Help></Help>} />
							<Route
								path="admin-panel"
								element={
									<ProtectedRoute>
										<AdminPanel></AdminPanel>
									</ProtectedRoute>
								}
							/>
							<Route path="*" element={<NoPage />} />
						</Route>
					</Routes>
				</Router>
			</AuthProvider>
		</QueryClientProvider>
	);
}
export default App;

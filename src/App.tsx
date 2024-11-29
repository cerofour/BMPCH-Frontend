import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomeLayout from "./components/layout/HomeLayout";
import Profile from "./pages/Profile";
import Catalogue from "./pages/Catalogue";
import Help from "./pages/Help";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import AdminPanel from "./pages/AdminPanel";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./hooks/useAuth";

import { CRUDContextProvider } from "./hooks/CRUDContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import CustomerPage from "./pages/CustomerPage";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<CRUDContextProvider>
					<Router>
						<Routes>
							<Route path="login" element={<Login></Login>} />
							{/* HomePage with a different layout */}
							<Route
								path="/"
								element={
									<ProtectedRoute>
										<HomeLayout />
									</ProtectedRoute>
								}
							>
								<Route index element={<HomePage />} />
							</Route>
							{/* Routes that use the layout */}
							<Route path="/" element={<Layout />}>
								<Route
									index
									element={
										<ProtectedRoute>
											<HomePage />
										</ProtectedRoute>
									}
								/>
								<Route
									path="catalogo"
									element={
										<ProtectedRoute>
											<Catalogue />
										</ProtectedRoute>
									}
								/>

								{/* Individual Book Page Route */}
								<Route
									path="catalogo/:id"
									element={
										<ProtectedRoute>
											<BookPage />
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
								<Route
									path="admin-panel"
									element={
										<ProtectedRoute>
											<AdminPanel />
										</ProtectedRoute>
									}
								/>
								<Route 
									path="clientes/:id"
									element={
										<ProtectedRoute>
											<CustomerPage />
										</ProtectedRoute>
									}
								/>
								<Route path="ayuda" element={<Help></Help>} />
								<Route path="*" element={<NoPage />} />
							</Route>
						</Routes>
					</Router>
				</CRUDContextProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
export default App;

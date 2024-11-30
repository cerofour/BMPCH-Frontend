import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "./pages/admin/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
import HomeLayout from "./components/layout/HomeLayout";
import Profile from "./pages/Profile";
import Catalogue from "./pages/Catalogue";
import Help from "./pages/Help";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./hooks/useAuth";

import { CRUDContextProvider } from "./hooks/CRUDContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";

import CustomersPage from "./pages/admin/CustomersPage";
import TextsPage from "./pages/admin/TextsPage";
import UsersPage from "./pages/admin/UsersPage";
import CustomerDetail from "./pages/admin/CustomerDetail";
import UserDetail from "./pages/admin/UserDetail";
import LoansPage from "./pages/admin/LoanPages";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<CRUDContextProvider>
					<Router>
						<Routes>
							<Route path="login" element={<Login />} />
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

							{/* Routes with UserLayout */}
							<Route
								path="/"
								element={
									<ProtectedRoute>
										<UserLayout />
									</ProtectedRoute>
								}
							>
								<Route path="catalogo" element={<Catalogue />} />
								<Route path="catalogo/:id" element={<BookPage />} />
								<Route path="perfil" element={<Profile />} />
								<Route path="ayuda" element={<Help />} />
							</Route>

							{/* Admin routes */}
							<Route
								path="admin"
								element={
									<ProtectedRoute>
										<AdminLayout />
									</ProtectedRoute>
								}
							>
								<Route path="usuarios" element={<UsersPage />} />
								<Route path="prestamos" element={<LoansPage />} />
								<Route path="usuarios/:id" element={<UserDetail />} />
								<Route path="clientes" element={<CustomersPage />} />
								<Route path="clientes/:id" element={<CustomerDetail />} />
								<Route path="textos" element={<TextsPage />} />
							</Route>

							{/* Catch-all route */}
							<Route path="*" element={<NoPage />} />
						</Routes>
					</Router>
				</CRUDContextProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;

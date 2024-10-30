import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Logout() {
  const { logout } = useAuth();

  logout();

  let navigate = useNavigate();
  navigate("/");

  return <h1>Sesión cerrada</h1>;
}

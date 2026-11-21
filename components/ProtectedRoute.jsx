import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  

export function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h2>Cargando...</h2>;
  if (!user) return <Navigate to="/login" />;

  return children;
}

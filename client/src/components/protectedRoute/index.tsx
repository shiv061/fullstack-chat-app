import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user } = useAuthContext();

  return user?.token ? <Outlet /> : <Navigate to="/login" />;
};

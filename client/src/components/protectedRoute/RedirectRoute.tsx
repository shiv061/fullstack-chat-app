import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const RedirectRoute = () => {
  const { user } = useAuthContext();

  return !user?.token ? <Outlet /> : <Navigate to="/" />;
};

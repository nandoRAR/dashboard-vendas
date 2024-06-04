import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthEmailContext } from "../contexts/authEmail";
export const PrivateRoutes = () => {
  const { user, loading } = useContext(AuthEmailContext);
  if (loading) {
    return <span className="sr-only">Loading...</span>;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

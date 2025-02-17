import { Navigate } from "react-router";
import { useAuth } from "../hooks/Auth.hooks";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return children;
  }
  return <Navigate to="/home" />;
};

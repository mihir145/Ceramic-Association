import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./Auth/helper";

const useAuth = () => {
  const { user } = isAuthenticated();
  return user && user.role === "user";
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/signin/user" />;
};

export default ProtectedRoutes;

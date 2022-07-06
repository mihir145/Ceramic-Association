import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./Auth/helper";

const useAuth = () => {
  return typeof isAuthenticated().company !== "undefined";
};

const CompanyRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/signin/company" />;
};

export default CompanyRoutes;

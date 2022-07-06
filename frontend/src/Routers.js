import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AdminDashboard from "./Components/AdminDashboard";
import Category from "./Components/AdminDashboard/Category";
import Company from "./Components/AdminDashboard/Company";
import Signin from "./Components/Signin";
import SigninForm from "./Components/Signin/SigninForm";
import SignupForm from "./Components/Signup/SignupForm";
import UserDashboard from "./Components/UserDashboard";

import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import CompanyRoutes from "./CompanyRoutes";
import UpdateCategory from "./Components/AdminDashboard/Category/UpdateCategory";
import User from "./Components/AdminDashboard/User";
import CompanyDashboard from "./Components/CompanyDashboard";
import Products from "./Components/CompanyDashboard/Products";
import Subcategory from "./Components/AdminDashboard/Subcategory";
import MarketPlace from "./Components/MarketPlace";
import CompanyProfile from "./Components/CompanyProfile";
import ChatDashboard from "./Components/ChatDashboard";
import CompanyProducts from "./Components/CompanyProfile/CompanyProducts";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signin" element={<Signin />} />
        <Route
          path="/signin/company"
          element={<SigninForm title="For Company" type="company" />}
        />
        <Route
          path="/signin/user"
          element={<SigninForm title="For User" type="user" />}
        />
        <Route
          path="/signup/user"
          element={<SignupForm title="For User" type="user" />}
        />
        <Route
          path="/signup/company"
          element={<SignupForm title="For Company" type="company" />}
        />

        <Route path="/market-place" element={<MarketPlace />} />
        <Route
          path="/company/profile/:companyId"
          element={<CompanyProfile />}
        />
        <Route
          path="/company/products/:companyId"
          element={<CompanyProducts />}
        />

        {/* User Routes Start */}
        <Route element={<PrivateRoutes />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/chat/:userId/:companyId" element={<ChatDashboard />} />
        </Route>
        {/* User Routes End */}

        {/* Admin Routes Start */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/category" element={<Category />} />
          <Route
            path="/admin-dashboard/category/update/:categoryId"
            element={<UpdateCategory />}
          />
          <Route path="/admin-dashboard/company" element={<Company />} />
          <Route path="/admin-dashboard/users" element={<User />} />
          <Route
            path="/admin-dashboard/subcategory"
            element={<Subcategory />}
          />
        </Route>
        {/* Admin Routes End */}

        {/* Company Routes Start */}
        <Route element={<CompanyRoutes />}>
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/company-dashboard/products" element={<Products />} />
        </Route>
        {/* Company Routes End */}
      </Routes>
    </Router>
  );
};

export default Routers;

// title="For User" desc="" type="user"

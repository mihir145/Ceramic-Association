import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isAuthenticated, signout } from "../../../Auth/helper";

import "./styles.css";

const routes = [
  {
    title: "Home",
    icon: "fa fa-home",
    path: "/admin-dashboard/",
  },

  {
    title: "Category",
    icon: "fa fa-list-alt",
    path: "/admin-dashboard/category",
  },
  {
    title: "Subcategory",
    icon: "fa fa-list",
    path: "/admin-dashboard/subcategory",
  },
  {
    title: "Company",
    icon: "fa fa-building-o",
    path: "/admin-dashboard/company",
  },
  {
    title: "Users",
    icon: "fa fa-users",
    path: "/admin-dashboard/users",
  },
  {
    title: "Feedbacks",
    icon: "fa fa-comments-o",
    path: "/admin-dashboard/feedback",
  },
];

const MenuLink = ({ className, icon, title, path }) => {
  return (
    <li className={className}>
      <Link className="menu-bars" to={path}>
        <i className={icon}></i> <span>{title}</span>
      </Link>
    </li>
  );
};

const AdminMenu = () => {
  const [sideBar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sideBar);
  return (
    <>
      <div className="navbar">
        <i className="fa fa-bars" onClick={showSidebar}></i>
        {isAuthenticated() && isAuthenticated().user.role === "admin" && (
          <button
            style={{
              margin: "10px",
              background: "red",
              color: "white",
              cursor: "pointer",
            }}
            className="logout"
            onClick={() => {
              const confirm = window.confirm("Are you sure want to logout?");
              if (confirm) {
                signout();
                window.location = `${window.location.origin}/signin/user`;
              }
            }}
          >
            Logout
          </button>
        )}
      </div>
      <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
        <i
          className="fa fa-close"
          style={{
            color: "black",
            cursor: "pointer",
            fontSize: "20px",
            marginBottom: "30px",
          }}
          onClick={showSidebar}
        ></i>
        <ul className="nav-menu-items">
          {routes.map((item, index) => {
            return (
              <MenuLink
                key={index}
                title={item.title}
                path={item.path}
                icon={item.icon}
                className="navbar-toggle"
              />
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default AdminMenu;

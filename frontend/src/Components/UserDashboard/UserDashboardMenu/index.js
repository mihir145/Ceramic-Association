import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const routes = [
  {
    title: "Home",
    icon: "fa fa-home",
    path: "/admin-dashboard/",
  },
  {
    title: "Chat",
    icon: "fa fa-comments",
    path: "/admin-dashboard/company",
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

const UserDashboardMenu = () => {
  const [sideBar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sideBar);
  return (
    <>
      <div className="navbar">
        <i className="fa fa-bars" onClick={showSidebar}></i>
        <h5 style={{ marginRight: "10px" }}>Logout</h5>
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

export default UserDashboardMenu;

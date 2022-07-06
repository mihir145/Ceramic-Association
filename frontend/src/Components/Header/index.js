import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Logo from "../../logo.svg";
import { isAuthenticated, signout } from "../../Auth/helper";
import { companyLogout } from "../../Api/Helper/company";

const Header = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  const { user } = isAuthenticated();

  return (
    <div className="wrapper">
      <nav className="nav-bar">
        <Link
          to="/"
          style={{
            textAlign: "center",
            color: "#37474f",
            textDecoration: "none",
          }}
        >
          <h3>Ceramic Association</h3>
        </Link>
        <div className="menubar">
          <div className="menus">
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/market-place">
                <li>Market Place</li>
              </Link>
              <Link to="/store">
                <li>Store</li>
              </Link>
              {!isAuthenticated() && (
                <Link to="/signin">
                  <li>Signin</li>
                </Link>
              )}
            </ul>
          </div>
          {isAuthenticated() ? (
            <>
              <div className="profile">
                <img
                  src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  alt="profile"
                  className="img"
                  onClick={() => setDisplayMenu(!displayMenu)}
                />
                <div
                  className="dropdown"
                  style={{ display: displayMenu ? "block" : "none" }}
                >
                  <ul>
                    <li>
                      <Link
                        to={
                          user.role === "admin"
                            ? "/admin-dashboard"
                            : "/user-dashboard"
                        }
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={() => {
                          const confirm = window.confirm(
                            "Are you sure want to logout?"
                          );
                          if (confirm) {
                            if (user.role === "admin") {
                              signout();
                              window.location = `${window.location.origin}/signin/user`;
                            } else if (
                              isAuthenticated().company !== "undefine"
                            ) {
                              companyLogout();
                              window.location = `${window.location.origin}/signin/company`;
                            }
                          }
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;

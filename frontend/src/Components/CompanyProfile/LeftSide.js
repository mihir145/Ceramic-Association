import React from "react";
import { Link } from "react-router-dom";
import API from "../../API";
import { isAuthenticated } from "../../Auth/helper";
import "./styles.css";
const LeftSide = ({ company }) => {
  return (
    <div className="left-side">
      <h2>{company?.name}</h2>
      <img
        src={`${API}/company/profile-picture/${company?._id}`}
        style={{ width: "200px", height: "200px" }}
      />
      <br />
      <div className="menu">
        <ul>
          <li>
            <Link to={`/company/profile/${company?._id}`}>Profile</Link>
          </li>
          <li>
            <Link to={`/company/products/${company?._id}`}>Products</Link>
          </li>
          <li>
            <Link to={`/company/profile/${isAuthenticated()?.user?._id}`}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;

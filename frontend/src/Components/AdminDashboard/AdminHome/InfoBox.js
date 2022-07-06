import React from "react";
import { Link } from "react-router-dom";
import "./InfoBox.css";

const InfoBox = ({ title, path, iconClass }) => {
  return (
    <div className="main-details-box">
      <h3>{title}</h3>
      <br />
      <i className={`${iconClass} icon`}></i>
      <br />
      <Link to={path}>
        See More <i className="fa fa-angle-right"></i>
      </Link>
    </div>
  );
};

export default InfoBox;

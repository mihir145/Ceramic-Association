import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <h5>&#169; Copyright {new Date().getFullYear()}</h5>
        <button>Contact us</button>
      </div>
    </div>
  );
};

export default Footer;

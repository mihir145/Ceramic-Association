import React from "react";
import { Link } from "react-router-dom";
import LoginIllustration from "../../login_illustration.svg";
import "./styles.css";
const SigninPage = () => {
  return (
    <>
      <div className="main-box">
        <div className="left">
          <h1 style={{ fontFamily: "Poppins,cursive", fontWeight: "normal" }}>
            Making Deals <br />
            with great companies.{" "}
          </h1>
          <br />
          <br />
          <br />
          <div className="profiles">
            <div className="company">
              <h2>For Companies</h2>
              <p>
                We are the market-leading technical interview platform to
                identify and hire developers wherever they are.
              </p>
              <Link to="company">Signin & Deal</Link>
            </div>

            <div className="user">
              <h2>For User</h2>
              <p>
                Join over top companies, make the deal, communicate about deal
                and done the deal
              </p>
              <Link to="user">Start Dealing</Link>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={LoginIllustration} alt="Login" />
        </div>
      </div>
    </>
  );
};

export default SigninPage;

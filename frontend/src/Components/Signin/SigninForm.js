import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { authenticate, isAuthenticated, signin } from "../../Auth/helper";
import LadyLogin from "../../Assets/lady_login.svg";
import { companySignin } from "../../Api/Helper/company";

const SigninForm = ({ title, type }) => {
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    password: "",
    email: "",
    error: false,
    success: false,
    loading: false,
    didRedirect: false,
  });

  const navigate = useNavigate();

  const { email, password, error, success, loading, didRedirect } = values;

  const performRedirect = () => {
    if (didRedirect) {
      if (user) {
        if (user.role === "user") {
          return <Navigate to="/" />;
        } else if (user.role === "admin") {
          return <Navigate to="/admin-dashboard" />;
        }
      }
    }
    if (isAuthenticated()) {
      if (user) {
        if (user.role === "user") {
          return <Navigate to="/" />;
        } else if (user.role === "admin") {
          return <Navigate to="/admin-dashboard" />;
        }
      }
      if (typeof isAuthenticated().company !== "undefined") {
        alert("company");
        alert(typeof isAuthenticated().company !== "undefined");
        return <Navigate to="/company-dashboard" />;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true, didRedirect: false });
    if (type === "company") {
      companySignin({ email, password })
        .then((data) => {
          if (data.error) {
            setValues({
              ...values,
              error: data.error,
              success: false,
              loading: false,
            });
          } else {
            authenticate(data, () => {
              return navigate("/company-dashboard");
              setValues({
                ...values,
                success: true,
                error: false,
              });
            });
          }
        })
        .catch((err) => console.log(err));
    } else if (type === "user") {
      signin({ email, password })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                success: true,
                error: false,
                didRedirect: true,
              });
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const LoadingMessage = () => {
    return (
      <>
        {loading && (
          <div
            style={{
              border: "1px solid green",
              color: "green",
              background: "rgb(0, 255, 0,0.5)",
              borderRadius: "3px",
              padding: "10px",
              width: "100%",
            }}
          >
            <h2>Loading...</h2>
          </div>
        )}
      </>
    );
  };

  const ErrorMessage = () => {
    return (
      <>
        {error && (
          <div
            style={{
              border: "1px solid red",
              color: "red",
              background: "rgb(255, 0, 0,0.4)",
              borderRadius: "3px",
              padding: "10px",
              width: "100%",
            }}
          >
            <h5>{user.error}</h5>
          </div>
        )}
      </>
    );
  };

  const Change = () => {
    return (
      <>
        <div className="signup">
          <Link to={`/signup`}>Signup</Link>
        </div>
        <div className="signin">
          <Link to={`/signin`}>Signin</Link>
        </div>
      </>
    );
  };

  const userForm = () => {
    return (
      <form>
        <h2>{title}</h2>
        <br />
        {ErrorMessage()}
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setValues({
              ...values,
              error: false,
              success: false,
              email: e.target.value,
            });
          }}
          className="email-field"
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter Password"
          className="password-field"
          onChange={(e) => {
            setValues({
              ...values,
              error: false,
              success: false,
              password: e.target.value,
            });
          }}
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Login</button>
        <br />
        <br />
        <br />
        <Link to={`/signup/${type}`}>Not have an account?</Link>
      </form>
    );
  };

  const rightSide = () => {
    return (
      <>
        <div className="right-side" style={{ padding: "10px" }}>
          <img
            src={LadyLogin}
            alt="mobile_login"
            style={{ width: "400px", height: "400px" }}
          />
        </div>
      </>
    );
  };

  const companyForm = () => {
    return (
      <form>
        <h2>{title}</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="email-field"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="password-field"
          value={password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Login</button>
        <br />
        <br />
        <br />
        <Link to={`/signup/${type}`}>Not have an account?</Link>
      </form>
    );
  };

  return (
    <>
      <Header />
      {performRedirect()}
      <div className="form-container">
        {/* <div className="menu">{Change()}</div> */}
        {type === "user" ? userForm() : companyForm()}
        {rightSide()}
      </div>
      <Footer />
    </>
  );
};

export default SigninForm;

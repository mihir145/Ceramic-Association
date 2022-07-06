import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import "./styles.css";
import MobileLogin from "../../Assets/mobile_login.svg";
import { signup } from "../../Auth/helper";
import { companySignup } from "../../Api/Helper/company";
import { getAllCategories } from "../../Api/Helper";

const SignupForm = ({ type, title }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmed_password: "",
    email: "",
    phone: "",
    address: "",
    error: false,
    success: false,
  });

  const [company, setCompany] = useState({
    name: "",
    password: "",
    confirmed_password: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    error: false,
    success: false,
    formData: new FormData(),
  });

  const [confirmPasswordStyle, setConfirmPasswordStyle] = useState({});

  const {
    name,
    password,
    confirmed_password,
    email,
    phone,
    address,
    error,
    success,
  } = user;

  const { formData } = company;

  const handleUserSubmit = (e) => {
    e.preventDefault();

    signup({
      name,
      password,
      email,
      phone,
      address,
    }).then((data) => {
      if (data.error) {
        setUser({ ...user, error: data.error, success: false });
      } else {
        setUser({
          name: "",
          password: "",
          confirmed_password: "",
          email: "",
          phone: "",
          address: "",
          error: false,
          success: true,
          formData: new FormData(),
        });
      }
    });
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    setCompany({ ...company, error: false, loading: true });
    const {
      address,
      confirmed_password,
      email,
      error,
      formData,
      name,
      password,
      phone,
      success,
    } = company;

    companySignup(formData).then((data) => {
      if (data.error) {
        setCompany({
          ...company,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setCompany({ ...company, error: false, success: true, loading: false });
      }
    });
  };

  const handleChange = (name) => (e) => {
    if (name === "confirmed_password" && user.password !== e.target.value) {
      setConfirmPasswordStyle({
        borderBottom: "1px solid red",
      });
    } else {
      setConfirmPasswordStyle({
        borderBottom: "1px solid #bd00ff",
      });
    }

    if (type === "user") {
      setUser({
        ...user,
        [name]: e.target.value,
        error: false,
        success: false,
      });
    } else {
      const value = name === "photo" ? e.target.files[0] : e.target.value;
      formData.set(name, value);
      setCompany({
        ...company,
        [name]: e.target.value,
        error: false,
        success: false,
      });
    }
  };

  const ErrorMessage = () => {
    return (
      <>
        {error || company.error ? (
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
        ) : null}
      </>
    );
  };

  const SuccessMessage = () => {
    return (
      <>
        {success || company.success ? (
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
            <h5>
              You're Registered! <Link to={`/signin/${type}`}>Click Here</Link>{" "}
              To Login
            </h5>
          </div>
        ) : null}
      </>
    );
  };

  const LoadingMessage = () => {
    return (
      <>
        {success || company.success ? (
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
            <h5>Loading...</h5>
          </div>
        ) : null}
      </>
    );
  };

  const UserForm = () => {
    return (
      <form>
        <h2>{title}</h2>

        <br />
        {ErrorMessage()}
        {SuccessMessage()}

        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter Username"
          className="name-field"
          value={name}
          onChange={handleChange("name")}
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="email-field"
          value={email}
          onChange={handleChange("email")}
        />
        <br />
        <br />
        <input
          type="number"
          name="phone"
          placeholder="Enter Phone no."
          value={phone}
          className="phone-field"
          onChange={handleChange("phone")}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="password-field"
          value={password}
          onChange={handleChange("password")}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Confirm Password"
          value={confirmed_password}
          className="password-field"
          onChange={handleChange("confirmed_password")}
          style={confirmPasswordStyle}
        />
        <br />
        <br />
        <textarea
          value={address}
          placeholder="Address"
          onChange={handleChange("address")}
        ></textarea>
        <br />
        <br />
        <button onClick={handleUserSubmit}>Register</button>
        <br />
        <br />
        <br />
        <Link to={`/signin/${type}`}>Already have an account?</Link>
      </form>
    );
  };

  const CompanyForm = () => {
    return (
      <>
        <form>
          <h2>{title}</h2>
          <br />
          {ErrorMessage()}
          {SuccessMessage()}

          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter Company Name"
            className="name-field"
            onChange={handleChange("name")}
          />
          <br />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="email-field"
            onChange={handleChange("email")}
          />
          <br />
          <br />
          <input
            type="number"
            name="phone"
            placeholder="Enter Phone no."
            className="phone-field"
            onChange={handleChange("phone")}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="password-field"
            onChange={handleChange("password")}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            className="password-field"
            onChange={handleChange("confirmed_password")}
            style={confirmPasswordStyle}
          />
          <br />
          <br />
          <input
            type="file"
            name="photo"
            className="profile-pic-field"
            onChange={handleChange("photo")}
          />
          <br />
          <br />
          <textarea
            placeholder="Address"
            onChange={handleChange("address")}
          ></textarea>
          <br />
          <br />
          <select
            className="category-dropdown"
            onChange={handleChange("category")}
          >
            <option key={`adfa`}>Select Category</option>
            {categories.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <button onClick={handleCompanySubmit}>Register</button>
          <br />
          <br />
          <br />
          <Link to={`/signin/${type}`}>Already have an account?</Link>
        </form>
      </>
    );
  };

  const rightSide = () => {
    return (
      <>
        <div className="right-side">
          <img src={MobileLogin} alt="mobile_login" />
        </div>
      </>
    );
  };

  return (
    <>
      <Header />

      <div className="form-container" style={{ position: "relative" }}>
        <br />
        {type === "user" ? <>{UserForm()}</> : <>{CompanyForm()}</>}
        {rightSide()}
      </div>

      {type === "user" ? JSON.stringify(user) : JSON.stringify(company)}
      <Footer />
    </>
  );
};

export default SignupForm;

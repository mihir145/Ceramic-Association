import React, { useState, useEffect } from "react";
import API from "../../../API";
import { getCompany } from "../../../Api/Helper/company";
import { isAuthenticated } from "../../../Auth/helper";
import "./styles.css";

const CompanyDashboardHome = () => {
  const { company } = isAuthenticated();
  const [disabledField, setDisabledField] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({
    name: company.name,
    email: company.email,
    phone: company.phone,
    address: company.address,
    isActive: company.isActive,
    error: false,
    loading: false,
    success: false,
  });

  const { name, email, phone, address, isActive } = companyDetails;

  const handleChange = (name) => (e) => {
    setCompanyDetails({ ...companyDetails, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="upper-section">
        <h3>Welcome, {isAuthenticated() ? company.name : "Guest"}</h3>
      </div>
      <br />
      <div className="lower-section">
        <h3>Profile Details</h3>
        <br />
        <img
          src={`${API}/company/profile-picture/${company._id}`}
          width="100"
          height="100"
        />
        <form>
          <div className="input-group">
            <div className="input-box">
              <span>Company name</span>
              <input
                type="text"
                placeholder="Enter username"
                value={name}
                disabled={disabledField}
                onChange={handleChange("name")}
              />
            </div>
            <div className="input-box">
              <span>Email</span>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                disabled={disabledField}
                onChange={handleChange("email")}
              />
            </div>
          </div>
          <br />
          <div className="input-group">
            <div className="input-box">
              <span>Status</span>
              <input
                type="text"
                placeholder="Status"
                disabled={true}
                value={isActive ? "Active" : "Inactive"}
              />
            </div>
            <div className="input-box">
              <span>Phone</span>
              <input
                type="number"
                placeholder="Enter Phone no."
                value={phone}
                disabled={disabledField}
                onChange={handleChange("phone")}
              />
            </div>
          </div>
          <br />
          <div className="input-group address">
            <div className="input-box">
              <span>Address</span>
              <textarea
                placeholder="Enter Address"
                disabled={disabledField}
                value={address}
                onChange={handleChange("address")}
              ></textarea>
            </div>
          </div>
          <br />
          <button
            type="button"
            className="edit-btn"
            onClick={
              disabledField
                ? (e) => {
                    setDisabledField(!disabledField);
                  }
                : handleSubmit
            }
          >
            {disabledField ? "Edit Details" : "Update"}
          </button>
          {!disabledField && (
            <button
              type="button"
              className="cancle-btn"
              onClick={() => {
                setDisabledField(!disabledField);
              }}
            >
              Cancel
            </button>
          )}
        </form>
        <img />
      </div>
    </div>
  );
};

export default CompanyDashboardHome;

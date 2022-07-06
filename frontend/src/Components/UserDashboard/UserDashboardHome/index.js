import React, { useState, useEffect } from "react";
import { updateUser } from "../../../Api/Helper";
import { isAuthenticated } from "../../../Auth/helper";
import "./styles.css";
const UserDashboardHome = () => {
  const { user, token } = isAuthenticated();

  const [disabledField, setDisabledField] = useState(true);

  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
    error: false,
    loading: false,
    success: false,
  });

  const { name, email, phone, role, address } = userDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, error: false, loading: true });
    updateUser({ name, email, phone, address }, user._id, token).then(
      (data) => {
        if (data.error) {
          setUserDetails({
            ...userDetails,
            error: data.error,
            loading: false,
            success: false,
          });
        } else {
          setUserDetails({
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role,
            address: data.address,
            error: false,
            loading: false,
            success: false,
          });
          setDisabledField(true);
          const localStorageItem = {
            token: token,
            user: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              role: data.role,
              address: data.address,
            },
          };
          localStorage.setItem("jwt", JSON.stringify(localStorageItem));
        }
      }
    );
  };

  const handleChange = (name) => (e) => {
    setUserDetails({
      ...userDetails,
      error: false,
      loading: false,
      success: false,
      [name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="upper-section">
        <h3>Welcome, {isAuthenticated() ? user.name : "Guest"}</h3>
      </div>
      <br />
      <div className="lower-section">
        <h3>Profile Details</h3>
        <br />
        <form>
          <div className="input-group">
            <div className="input-box">
              <span>Username</span>
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
              <span>Role</span>
              <input
                type="text"
                placeholder="Your Role"
                disabled={true}
                value={role}
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
      </div>
    </div>
  );
};

export default UserDashboardHome;

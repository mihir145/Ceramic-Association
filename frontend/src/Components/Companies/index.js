import React, { useState, useEffect } from "react";
import API from "../../API";
import "./styles.css";
import { getCompanies, getCompany } from "../../Api/Helper/company";
import { Link } from "react-router-dom";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setCompanies(data);
      }
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Companies</h1>
      <br />
      <br />
      <br />
      <div className="companies-container">
        {companies.map((item) => {
          return (
            <div className="company-container">
              <img src={`${API}/company/profile-picture/${item._id}`} />
              <Link to={`/company/profile/${item._id}`}>{item.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Companies;

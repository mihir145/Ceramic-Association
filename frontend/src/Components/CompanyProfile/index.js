import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../API";
import { getCompany } from "../../Api/Helper/company";
import { isAuthenticated } from "../../Auth/helper";
import Header from "../Header";
import LeftSide from "./LeftSide";
import "./styles.css";

const CompanyProfile = () => {
  const params = useParams();
  const { companyId } = params;

  const [company, setCompany] = useState({});

  useEffect(() => {
    getCompany(companyId).then((data) => {
      if (data?.error) {
        alert(data?.error);
      } else {
        setCompany(data);
        console.log(data);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="main-container">
        <LeftSide company={company} />
        <div className="right-side">
          <h3>Information</h3>
          <hr />
          <br />
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <b>Email</b>
              <br />
              <span>{company?.email}</span>
            </div>
            {"    "}
            <div>
              <b>Address</b>
              <br />
              <span>{company?.address}</span>
            </div>
          </div>
          <br />
          <div>
            <div>
              <b>Phone</b>
              <br />
              <span>{company?.phone}</span>
            </div>
            <br />
            <div>
              <b>Category</b>
              <br />
              <span
                style={{
                  marginTop: "20px",
                  background: "#de83ff",
                  color: "white",
                  padding: "4px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                }}
              >
                {company?.category?.name}
              </span>
            </div>
            <br />
            <br />
            <div>
              <button className="follow-btn">Follow</button>
              <button className="message-btn">Message</button>
            </div>
          </div>

          {/* <Link to={`/chat/${is Authenticated().user._id}/${companyId}`}>
            Message
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

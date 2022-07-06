import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchCompanies } from "../../Api/Helper/company";
import "./styles.css";

const HeroSection = () => {
  const [show, setShow] = useState(false);
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (searchedKeyword) {
      setShow(true);
    } else {
      setShow(false);
    }

    searchCompanies(searchedKeyword).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setCompanies(data);
        console.log(data);
      }
    });
  }, [searchedKeyword]);

  useEffect(() => {}, []);

  return (
    <div className="main">
      <div className="overlay"></div>
      <div className="content-container">
        <span>
          Welcome to
          <br /> <b>Ceramic Association</b>
        </span>
        <div className="main-input-box">
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search best companies..."
            onChange={(e) => setSearchedKeyword(e.target.value)}
            value={searchedKeyword}
          />
        </div>
        <div
          className="searched-item-box"
          style={{ display: show ? "block" : "none" }}
        >
          {companies.map((item) => {
            return (
              <div className="item">
                <Link to={``}>{item.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../../API";
import { getCompany, getProductsByCompany } from "../../../Api/Helper/company";
import Header from "../../Header";
import LeftSide from "../LeftSide";
import "./styles.css";

const CompanyProducts = () => {
  const params = useParams();

  const [company, setCompany] = useState({});
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { companyId } = params;

  useEffect(() => {
    getCompany(companyId).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setCompany(data);
        console.log(data);
      }
    });
  }, []);

  useEffect(() => {
    getProductsByCompany(companyId, searchKeyword)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setProducts(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchKeyword]);

  return (
    <div>
      <Header />
      <div className="main-container">
        <LeftSide company={company} />
        <div className="right-side">
          <div className="input-box-product">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Search Product"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <br />
          <div className="products-container">
            {products.length > 0
              ? products.map((item) => {
                  return (
                    <Link key={item._id} to={`/product/${item._id}`}>
                      <div className="product-container">
                        <div className="product-img">
                          <img src={`${API}/product/image/${item._id}`} />
                        </div>
                        <div className="details-container">
                          <h4>{item.name}</h4>
                          <h6>{item.size}</h6>
                          <h6>{item.description}</h6>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : "No Products Found!"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProducts;

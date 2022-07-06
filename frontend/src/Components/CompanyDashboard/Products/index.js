import React, { useState, useEffect } from "react";
import { addProduct } from "../../../Api/Helper";
import { getCompanies, getCompany } from "../../../Api/Helper/company";
import { isAuthenticated } from "../../../Auth/helper";
import CompanyDashboardMenu from "../CompanyDashboardMenu";
import "./styles.css";

const Products = () => {
  const [product, setProduct] = useState({
    name: "",
    photo: "",
    size: "",
    price: "",
    company: isAuthenticated().company._id,
    description: "",
    formData: new FormData(),
  });

  const { name, price, company, description, formData, size, photo } = product;

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.set("company", isAuthenticated().company._id);
    addProduct(formData, isAuthenticated().company._id, isAuthenticated().token)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Product Added Successfully!");
          setProduct({
            name: "",
            photo: "",
            size: "",
            price: "",
            company: isAuthenticated().company._id,
            description: "",
            formData: new FormData(),
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const productForm = () => {
    return (
      <>
        <form>
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            onChange={handleChange("name")}
          />
          <textarea
            style={{ padding: "10px" }}
            name="description"
            placeholder="Description"
            onChange={handleChange("description")}
          ></textarea>
          <br />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange("price")}
          />
          <br />
          <input
            type="text"
            name="size"
            placeholder="Size like 500X500"
            onChange={handleChange("size")}
          />
          <input
            type="file"
            name="product_image"
            onChange={handleChange("photo")}
          />
          <br />
          <button className="submit-btn" onClick={handleSubmit}>
            Add Product
          </button>
        </form>
      </>
    );
  };

  return (
    <div>
      <CompanyDashboardMenu />
      <br />
      <br />
      <br />
      <div className="">
        <div className="upper-section">
          <h3>Manage Your Products Here...</h3>
        </div>
        <div className="lower-section">
          <h4>Add Your Products here...</h4>
          <br />
          {productForm()}
        </div>
      </div>
    </div>
  );
};

export default Products;

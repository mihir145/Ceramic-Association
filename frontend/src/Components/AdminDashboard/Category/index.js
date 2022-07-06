import React, { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu";
import "./styles.css";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../../../Api/Helper";
import { isAuthenticated } from "../../../Auth/helper";
import API from "../../../API";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState({
    name: "",
    formData: new FormData(),
    photo: "",
    loading: false,
    success: false,
    error: false,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
      } else {
        setCategories(data);
      }
    });
  }, []);

  const { name, formData, loading, success, error, photo } = category;
  const { token, user } = isAuthenticated();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategory({ ...category, loading: true });
    addCategory(formData, user._id, token).then((data) => {
      if (data.error) {
        setCategory({
          ...category,
          error: JSON.stringify(data.error),
          loading: false,
          success: false,
        });
      } else {
        setCategory({
          name: "",
          formData: new FormData(),
          photo: "",
          loading: false,
          success: true,
          error: false,
        });
      }
    });
  };

  const handleFile = (e) => {
    setCategory({
      ...category,
      photo: e.target.files[0],
      error: false,
      success: false,
    });
    formData.set("photo", photo);
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
      error: false,
      success: false,
    });
    formData.set("name", name);
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
            <h3>Loading...</h3>
          </div>
        )}
      </>
    );
  };

  const SuccessMessage = () => {
    return (
      <>
        {success && (
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
            <h4>Category Successfully Created.</h4>
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
            <h5>{error}</h5>
          </div>
        )}
      </>
    );
  };

  const AddCategoryForm = () => {
    return (
      <>
        <div className="add-category-form">
          <form encType="multipart/form-data">
            <input
              className="input-field"
              placeholder="Category Name "
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />{" "}
            <br />
            <input
              className="input-field"
              type="file"
              name="photo"
              onChange={handleFile}
            />{" "}
            <br />
            <button className="add-btn" type="button" onClick={handleSubmit}>
              Add
            </button>
          </form>
        </div>
      </>
    );
  };

  const categoryTable = () => {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Category name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={`${API}/category/${item._id}`}
                        width="100"
                        height="100"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <Link
                        to={`/admin-dashboard/category/update/${item._id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          deleteCategory(item._id, user._id, token).then(
                            (data) => {
                              if (data.error) {
                                alert(data.error);
                              } else {
                                alert("Category deleted successfully!");
                                window.location.reload();
                              }
                            }
                          );
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div>
      <AdminMenu />
      <br />
      <br />
      <br />
      <br />
      <div className="top-bar">
        <h3>Manage Category </h3>
      </div>
      <div className="middle-bar">
        <h4>Add Category</h4>

        {SuccessMessage()}
        {ErrorMessage()}
        {LoadingMessage()}
        {AddCategoryForm(handleSubmit)}
        {categoryTable()}
      </div>
    </div>
  );
};

export default Category;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../API";
import {
  addSubcategory,
  deleteSubcategory,
  getAllCategories,
  getAllSubcategories,
} from "../../../Api/Helper";
import { isAuthenticated } from "../../../Auth/helper";
import AdminMenu from "../AdminMenu";
import "./styles.css";

const Subcategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState({
    name: "",
    category: "",
    photo: "",
    formData: new FormData(),
    error: false,
    loading: false,
    success: false,
  });

  const { user, token } = isAuthenticated();

  const { name, category, photo, formData, error, loading, success } =
    subcategory;

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  useEffect(() => {
    getAllSubcategories().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setSubcategories(data);
      }
    });
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    formData.set(name, value);
    setSubcategory({
      ...subcategory,
      error: false,
      success: false,
      loading: false,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubcategory({
      ...subcategory,
      loading: true,
      success: false,
      error: false,
    });
    addSubcategory(formData, user._id, token).then((data) => {
      if (data.error) {
        setSubcategory({
          ...subcategory,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        alert("Subcategory created Successfully!");
        window.location.reload();
      }
    });
  };

  const subcategoryForm = () => {
    return (
      <>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Subcategory Name"
            onChange={handleChange("name")}
          />
          <br />
          <input type="file" name="photo" onChange={handleChange("photo")} />
          <br />
          <select onChange={handleChange("category")}>
            <option>Select category</option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <br />
          <button className="submit-btn" onClick={handleSubmit}>
            Add
          </button>
        </form>
      </>
    );
  };

  const subcategoryTable = () => {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Category name</th>
              <th scope="col">Subcategory Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {subcategories &&
              subcategories.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={`${API}/subcategory/image/${item._id}`}
                        width="100"
                        height="100"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <Link
                        to={`/admin-dashboard/subcategory/update/${item._id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          deleteSubcategory(item._id, user._id, token).then(
                            (data) => {
                              if (data.error) {
                                alert(data.error);
                              } else {
                                alert("Subcategory deleted successfully!");
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
      <div className="upper-section">
        <h2>Manage Subcategory </h2>
      </div>
      <div className="lower-section">
        <h3>Add Subcategory Here...</h3>
        <br />
        {subcategoryForm()}
        <br />
        <br />
        {subcategoryTable()}
      </div>
    </div>
  );
};

export default Subcategory;

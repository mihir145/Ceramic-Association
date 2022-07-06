import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../API";
import { getCategory, updateCategory } from "../../../Api/Helper";
import { isAuthenticated } from "../../../Auth/helper";
import AdminMenu from "../AdminMenu";
import "./styles.css";

const UpdateCategory = () => {
  const [category, setCategory] = useState({});
  const [values, setValues] = useState({
    name: "",
    formData: new FormData(),
    loading: false,
    success: false,
    error: false,
  });

  const { categoryId } = useParams();
  const { user, token } = isAuthenticated();
  const { name, formData, loading, success, error } = values;

  useEffect(() => {
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setCategory(data);
          setValues({ ...values, name: category.name });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    updateCategory(formData, categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: true, success: false, loading: false });
        }
      })
      .catch((err) => console.log(err));
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

  const cateForm = () => {
    return (
      <form>
        <input
          type="text"
          onChange={handleChange("name")}
          className="input-field"
          placeholder="Category Name"
          value={name}
        />
        <br />
        <input
          type="file"
          onChange={handleChange("photo")}
          className="input-field"
        />
        <br />
        <button type="button" className="add-btn" onClick={handleSubmit}>
          Update
        </button>
      </form>
    );
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <AdminMenu />
      <br />
      <br />
      <br />
      <div style={{ margin: "50px auto", textAlign: "center" }}>
        <h2>{category.name}</h2>
        <img
          src={`${API}/category/${categoryId}`}
          style={{ borderRadius: "50%" }}
          width="200"
          height="200"
        />
        {cateForm()}
      </div>
    </>
  );
};

export default UpdateCategory;

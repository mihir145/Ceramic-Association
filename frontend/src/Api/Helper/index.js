import API from "../../API";

export const addCategory = (category, userId, token) => {
  return fetch(`${API}/category/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCategory = (categoryId) => {
  return fetch(`${API}/get-category/${categoryId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateCategory = (data, categoryId, userId, token) => {
  return fetch(`${API}/category/${userId}/${categoryId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateUser = (data, userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getUsers = () => {
  return fetch(`${API}/users`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateCompanyStatus = (data, userId, companyId, token) => {
  return fetch(`${API}/company/update-status/${userId}/${companyId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const addSubcategory = (data, userId, token) => {
  return fetch(`${API}/subcategory/add/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getAllSubcategories = () => {
  return fetch(`${API}/subcategories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const addProduct = (data, companyId, token) => {
  return fetch(`${API}/product/add/${companyId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${userId}/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteSubcategory = (subcategoryId, userId, token) => {
  return fetch(`${API}/subcategory/${userId}/${subcategoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

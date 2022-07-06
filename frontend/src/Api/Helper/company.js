import API from "../../API";

export const companySignup = (company) => {
  return fetch(`${API}/company/signup`, {
    method: "POST",
    body: company,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const companySignin = (data) => {
  return fetch(`${API}/company/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCompanies = () => {
  return fetch(`${API}/companies`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCompany = (companyId) => {
  return fetch(`${API}/company/${companyId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const companyLogout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    return fetch(`${API}/company/logout`, {
      method: "GET",
    })
      .then((res) => {
        console.log("Signout successfull");
      })
      .catch((err) => console.log(err));
  }
};

export const getProductsByCompany = (companyId, searchKeyword) => {
  return fetch(
    searchKeyword
      ? `${API}/product/get-all/${companyId}?searchKeyword=${searchKeyword}`
      : `${API}/product/get-all/${companyId}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const searchCompanies = (searchKeyword) => {
  return fetch(
    searchKeyword
      ? `${API}/search/companies?searchKeyword=${searchKeyword}`
      : `${API}/search/companies`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

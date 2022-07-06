import React, { useState, useEffect } from "react";
import API from "../../../API";
import { updateCompanyStatus } from "../../../Api/Helper";
import { getCompanies } from "../../../Api/Helper/company";
import { isAuthenticated } from "../../../Auth/helper";
import AdminMenu from "../AdminMenu";
import "./styles.css";

const Company = () => {
  const [companies, setCompanies] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    getCompanies()
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setCompanies(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const companyTable = () => {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone no.</th>
              <th scope="col">Address</th>
              <th scope="col">Category</th>
              <th scope="col">Profile</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {companies.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td scope="row">{index + 1}</td>
                  <td scope="row">{item.name}</td>
                  <td scope="row">{item.email}</td>
                  <td scope="row">{item.phone}</td>
                  <td scope="row">{item.address}</td>
                  <td scope="row">{item.category.name}</td>
                  <td scope="row">
                    <img
                      src={`${API}/company/profile-picture/${item._id}`}
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>
                    {item.isActive ? (
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          updateCompanyStatus(
                            {
                              ...item,
                              isActive: !item.isActive,
                            },
                            user._id,
                            item._id,
                            token
                          ).then((data) => {
                            if (data.error) {
                              alert(data.error);
                            } else {
                              alert(data.message);
                            }
                          });
                        }}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          updateCompanyStatus(
                            {
                              ...item,
                              isActive: !item.isActive,
                            },
                            user._id,
                            item._id,
                            token
                          ).then((data) => {
                            if (data.error) {
                              alert(data.error);
                            } else {
                              alert(data.message);
                              window.location.reload();
                            }
                          });
                        }}
                      >
                        Activate
                      </button>
                    )}
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
        <h3>Manage Company</h3>
      </div>
      <div className="middle-bar">{companyTable()}</div>
    </div>
  );
};

export default Company;

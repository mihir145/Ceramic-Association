import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllSubcategories,
  getUsers,
} from "../../../Api/Helper";
import { getCompanies } from "../../../Api/Helper/company";
import InfoBox from "./InfoBox";
import "./styles.css";

const AdminHome = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);

  const routes = [
    {
      title: `${categories.length} Category`,
      icon: "fa fa-list-alt",
      path: "/admin-dashboard/category",
    },
    {
      title: `${subcategories.length} Subcategories`,
      icon: "fa fa-list",
      path: "/admin-dashboard/subcategory",
    },
    {
      title: `${companies.length} Company`,
      icon: "fa fa-building-o",
      path: "/admin-dashboard/company",
    },
    {
      title: `${users.length} Users`,
      icon: "fa fa-users",
      path: "/admin-dashboard/users",
    },
    {
      title: "Feedbacks",
      icon: "fa fa-comments-o",
      path: "/admin-dashboard/feedback",
    },
  ];

  useEffect(() => {
    getCompanies().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setCompanies(data);
      }
    });
  }, []);

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

  useEffect(() => {
    getUsers().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setUsers(data);
      }
    });
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="top-bar">
        <h2>Welcome, Admin</h2>
      </div>
      <div className="middle-bar">
        <div className="details-container">
          {routes.map((item, index) => {
            return (
              <>
                <InfoBox
                  path={item.path}
                  iconClass={item.icon}
                  title={item.title}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminHome;

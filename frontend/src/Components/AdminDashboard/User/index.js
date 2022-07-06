import React, { useState, useEffect } from "react";
import { getUsers } from "../../../Api/Helper";
import AdminMenu from "../AdminMenu";
import "./styles.css";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setUsers(data);
      }
    });
  }, []);

  const userTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no.</th>
            <th scope="col">Address</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={item._id}>
                <td scope="row">{index + 1}</td>
                <td scope="row">{item.name}</td>
                <td scope="row">{item.email}</td>
                <td scope="row">{item.phone}</td>
                <td scope="row">{item.address}</td>
                <td>
                  <button className="btn btn-danger">Deactivate</button>
                  {"     "}
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <div>
      <AdminMenu />
      <br />
      <br />
      <br />{" "}
      <div className="top-bar">
        <h3>Manage Users</h3>
      </div>
      <div className="middle-bar">{userTable()}</div>
    </div>
  );
};

export default User;

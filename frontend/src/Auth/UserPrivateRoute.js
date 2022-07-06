import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const CompanyPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === "user" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default CompanyPrivateRoute;

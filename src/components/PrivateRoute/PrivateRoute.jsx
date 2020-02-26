import React from "react";
import { Redirect, Route } from "react-router-dom";

export const isAuthenticated = () => {
  return localStorage.getItem("authToken") ? true : false;
};

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated() ? children : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;

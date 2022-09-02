import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.UserActions);
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/SignIn",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { hasDocTokenInLocalStorage } from ".";

const DocRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        hasDocTokenInLocalStorage() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/doclogin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default DocRoute;

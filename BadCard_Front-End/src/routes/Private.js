// @flow
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { type AuthStateType } from "reducers/auth";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  currentUserRole,
  roles,
  ...rest
}: {
  component: Function,
  isAuthenticated: boolean,
  currentUserRole: $PropertyType<AuthStateType, "role">,
  roles: $PropertyType<AuthStateType, "role">[],
  path: string,
  location?: Object,
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && roles.includes(currentUserRole) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

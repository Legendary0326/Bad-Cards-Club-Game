// @flow
import React from "react";
import { Route } from "react-router-dom";

const PublicRoutes = ({
  component: Component,
  ...rest
}: {
  component: Function
}) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default PublicRoutes;

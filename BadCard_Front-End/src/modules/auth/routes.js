// @flow
import { lazy } from "react";

export default [
  {
    path: "/sign-in",
    exact: true,
    auth: false,
    component: lazy(() => import("./pages/signIn")),
  },
  {
    path: "/sign-up",
    exact: true,
    auth: false,
    component: lazy(() => import("./pages/signUp")),
  },
];

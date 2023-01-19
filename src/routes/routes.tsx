import React, { lazy } from "react";
import WithSuspense from "../components/WithSuspense";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "./constants";

import { AppRoute } from "../types";


const { HOME } = PUBLIC_PATHS;

const {
  TEMPLATE,
  TEMPLATES
} = PRIVATE_PATHS;

//with suspense is used for lazy loading the ui
// const Home = WithSuspense(lazy(() => import("../pages/Home")));
const Landing = lazy(() => import("../pages/index"))

const Templates = lazy(() => import("../pages/templates/index"))

const Template = lazy(() => import("../pages/template/index"))


export const PUBLIC_ROUTES: AppRoute[] = [
  { path: HOME, element: <Landing /> },
  // { path: "*", element: <Navigate to="/" replace /> },

  // non existing url will redirect to home page
];

export const PRIVATE_ROUTES: AppRoute[] = [
  { path: TEMPLATE, element: <Template /> },
  { path: TEMPLATES, element: <Templates /> },

  // { path: "*", element: <Navigate to="/" replace /> },

  //non existing url will redirect back to the dashboard
];

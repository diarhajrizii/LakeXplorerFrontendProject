import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Lakes from "../pages/lakes/Lakes";
import LakeSightings from "../pages/lake-sightings/LakeSightings";

const userRoutes = [
  { path: "/", component: Lakes },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/lake-sightings/:lakeId", component: LakeSightings },
  { path: "/", exact: true, component: () => <Navigate to="/" /> },
];
export { userRoutes };

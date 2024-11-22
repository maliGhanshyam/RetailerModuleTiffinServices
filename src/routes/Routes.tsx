import React from 'react';
import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { RetailerDashboard } from "../pages/dashboard";
import { UserLandingPage } from "../pages/landingPage";

const childRoutes = [
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "",
    element: <RetailerDashboard />,
  },
  {
    path: "/landingPage",
    element: <UserLandingPage />,
  },
];

export default childRoutes;

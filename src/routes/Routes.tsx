import React from 'react';
import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import AddTiffinForm from "../pages/AddTiffinPage/AddTiffinForm";
import { RetailerRegistration } from "../pages/RetailerRegistration";
import { Order } from "../pages/Order";
import ProtectedRoute from "./ProtectedRoute";
import { ProfileUpdate } from "../pages/ProfileUpdate";
import { LoginForm } from "../pages/LoginPage";
import { TiffinTable } from "../pages/TiffinTable";
import { RETAILER_ROLE_ID } from "../constants/ROLES";

const childRoutes = [
  {
    path: "login",
    element: (
      <ProtectedRoute guestOnly={true}>
        <LoginForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "addTiffin",
    element: <AddTiffinForm />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "register",
    element: <RetailerRegistration />,
  },
  {
    path: "order",
    element: <Order />,
  },
  {
    path: "tiffin",
    element: <TiffinTable />,
  },

  {
    path: "update-profile",
    element: (
      <ProtectedRoute requiredRole={RETAILER_ROLE_ID}>
        <ProfileUpdate />
      </ProtectedRoute>
    ),
  },
  {
    path: "",
    element: <Navigate to="login" />,
  },
];

export default childRoutes;

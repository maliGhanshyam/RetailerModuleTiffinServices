import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { LoginForm } from "../pages/LoginPage";
import AddTiffinForm from "../pages/AddTiffinPage/AddTiffinForm";
import ProtectedRoute from "./ProtectedRoute";
import { RETAILER_ID } from "../constants/ROLES";

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
    element: (
      <ProtectedRoute requiredRole={RETAILER_ID}>
        <AddTiffinForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default childRoutes;

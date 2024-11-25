import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { RetailerRegistration } from "../pages/RetailerRegistration";
import { Order } from "../pages/Order";
import { TiffinTable } from "../pages/TiffinTable";
import ProtectedRoute from "./ProtectedRoute";
import { LoginForm } from "../pages/LoginPage";
import { RETAILER_ROLE_ID } from "../constants/ROLES";
import { ProfileUpdate } from "../pages/ProfileUpdate";

const childRoutes = [
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
    element: <Order/>,
  },
  {
    path: "tiffin",
    element: <TiffinTable/>,
  },
  {
    path: "login",
    element: (
      <ProtectedRoute guestOnly={true}>
        <LoginForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "update-profile",
    element: (
    <ProtectedRoute requiredRole={RETAILER_ROLE_ID}><ProfileUpdate/></ProtectedRoute>
    )
  },
  {
    path: "",
    element: <Navigate to="login" />,
  }
];

export default childRoutes;

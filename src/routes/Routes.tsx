import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { LoginForm } from "../pages/LoginPage";
import AddTiffinForm from "../pages/AddTiffinPage/AddTiffinForm";

const childRoutes = [
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "addTiffin",
    element: <AddTiffinForm />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default childRoutes;

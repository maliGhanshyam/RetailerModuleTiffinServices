import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { UserDashboard } from "../pages/dashboard";
import { UserLandingPage } from "../pages/landingPage";

const childRoutes = [
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "",
    element: <UserDashboard />,
  },
  {
    path: "/landingPage",
    element: <UserLandingPage />,
  },
];

export default childRoutes;

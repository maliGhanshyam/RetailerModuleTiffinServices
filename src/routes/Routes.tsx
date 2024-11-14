import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";

const childRoutes = [
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default childRoutes;

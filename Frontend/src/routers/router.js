import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Layout from "../pages/admin/layout";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Main />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
  },
]);
export default router;

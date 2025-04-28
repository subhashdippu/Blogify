import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Signup from "../pages/signup";
import Login from "../pages/login";
import DashboardLayout from "../pages/admin/manageBlogs";
import Create from "../pages/admin/createBlog";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Main />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
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
    element: <DashboardLayout />,
  },
  {
    path: "/create",
    element: <Create />,
  },
]);
export default router;

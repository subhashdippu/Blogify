import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Signup from "../pages/signup";
import Login from "../pages/login";
import DashboardLayout from "../pages/admin/ManageBlogs";
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
    element: (
      // <PrivateRoute>
      <DashboardLayout />
      // </PrivateRoute>
    ),
  },
]);
export default router;

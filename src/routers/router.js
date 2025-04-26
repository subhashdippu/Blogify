import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Signup from "../pages/signup";
import Login from "../pages/login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;

import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import HomeScreen from "../pages/home/HomeScreen";
import MessagePage from "../utils/MessagePage";
import SignIn from "../pages/auth/Signin";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import PrivateRoute from "./privateRoute";

export const mainRouter = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: (
      //   <PrivateRoute>
      <HomeScreen />
      //   </PrivateRoute>
    ),
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/:token/verify-account",
    element: <SignIn />,
  },
  {
    path: "/message",
    element: <MessagePage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/:token/reset-account-password",
    element: <ChangePassword />,
  },
]);

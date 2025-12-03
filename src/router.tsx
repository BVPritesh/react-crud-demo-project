import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@layouts/DefaultLayout";
import PageNotFound from "@pages/PageNotFound";
import Home from "@pages/Home";
import SignIn from "@pages/sign-in";
import SignUp from "@pages/sign-up";
import About from "@pages/about";
import Dashboard from "@pages/admin/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DefaultLayout />,
    children: [{ path: "", element: <Dashboard /> }],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
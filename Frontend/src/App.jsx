import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./page/Root";
import HomePage from "./page/HomePage";
import MemberPage from "./page/MemberPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ForgetPassword from "./page/ForgetPassword";
import CardPage from "./page/CardPage";
import { queryClient } from "./util/http";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "member",
        children: [{ index: true, element: <MemberPage /> }],
      },
      {
        path: "register",
        children: [{ index: true, element: <RegisterPage /> }],
      },
      { path: "login", children: [{ index: true, element: <LoginPage /> }] },
      {
        path: "forgetpassword",
        children: [{ index: true, element: <ForgetPassword /> }],
      },
      {
        path: "vocabulary",
        children: [{ index: true }, { path: "card", element: <CardPage /> }],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

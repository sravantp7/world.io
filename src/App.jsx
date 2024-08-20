import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage /> /* Render when the path is not found */,
    children: [{}],
  },
  {
    path: "/app",
    element: <AppLayout />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

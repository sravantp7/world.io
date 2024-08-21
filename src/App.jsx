import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountiesList from "./components/CountriesList";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage /> /* Render when the path is not found */,
    children: [],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        // Render cityList as a default ui for app
        index: true,
        element: <CityList />,
      },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "countries",
        element: <CountiesList />,
      },
      {
        path: "form",
        element: <p>Form</p>,
      },
    ],
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

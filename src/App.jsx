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

// Loader function used to load city information which then passed to routes element
async function loadCities() {
  try {
    const res = await fetch("http://localhost:8000/cities");
    const cities = await res.json();
    return { cities };
  } catch (error) {
    console.log("Failed to load cities information");
  }
}

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
        loader: loadCities,
      },
      {
        path: "cities",
        element: <CityList />,
        loader: loadCities,
      },
      {
        path: "countries",
        element: <CountiesList />,
        loader: loadCities,
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

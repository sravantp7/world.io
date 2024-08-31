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
import CityInfo from "./components/CityInfo";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";

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
      /*
      {
        // Render cityList as a default ui for app
        index: true,
        loader: loadCities,
        children: [
          {
            path: ":cityId",
            element: <CityInfo />,
            loader: loadCities,
          },
        ],
      }, */
      {
        path: "cities",
        element: <CityList />,
        // Loading data for the component (react router way)
        // loader: loadCities,
        children: [
          {
            path: ":cityId",
            element: <CityInfo />,
            // loader: loadCities,
          },
        ],
      },
      {
        path: "countries",
        element: <CountiesList />,
        // loader: loadCities,
      },
      {
        path: "form",
        element: <Form />,
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
  return (
    <AuthProvider>
      <CitiesProvider>
        <RouterProvider router={router} />
      </CitiesProvider>
    </AuthProvider>
  );
}

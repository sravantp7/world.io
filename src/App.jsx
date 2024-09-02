import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
// import Homepage from "./pages/Homepage";
// import ErrorPage from "./pages/ErrorPage";
// import AppLayout from "./pages/AppLayout";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";

// Components
import CityList from "./components/CityList";
import CountiesList from "./components/CountriesList";
import CityInfo from "./components/CityInfo";
import Form from "./components/Form";
import Loading from "./components/Loading";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";

// Lazy loading pages, ie, it will loaded on demand only.
// That is Login page will only downloaded when we go to the login page in the app.
// Splits bundle into separate chunks.
const Homepage = lazy(() => import("./pages/Homepage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));

// BEFORE LAZY LOADING has implemented.
// dist/index.html                   0.46 kB │ gzip:   0.29 kB
// dist/assets/index-DUsNXsrz.css   29.68 kB │ gzip:   5.02 kB
// dist/assets/index-DlOmEd7v.js   549.79 kB │ gzip: 161.95 kB

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
        {/* Suspense the rendering of component until it downloaded completely. Also displays a fallback message during downloading. */}
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  );
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage /> /* Render when the path is not found */,
    children: [],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

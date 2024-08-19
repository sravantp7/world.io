import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import AppLayout from "./pages/AppLayout";

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
]);

export default function App() {
  return <RouterProvider router={router} />;
}

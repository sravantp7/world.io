import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import { Navigate } from "react-router-dom";
import User from "../components/User";
import ProtectedRoute from "./ProtectedRoute";

export default function AppLayout() {
  return (
    // ProtectedRoute checks for user login before rendering the anything comes after /app route
    <ProtectedRoute>
      <div className={styles.appLayout}>
        {/* This component update the URL to /app/cities when we are trying to render /app */}
        <Navigate to={"cities"} replace={true} />
        <Sidebar />
        <Map />

        {/* Renders current user details */}
        <User />
      </div>
    </ProtectedRoute>
  );
}

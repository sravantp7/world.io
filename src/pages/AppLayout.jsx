import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import { Navigate } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className={styles.appLayout}>
      {/* This component update the URL to /app/cities when we are trying to render /app */}
      <Navigate to={"cities"} replace={true} />
      <Sidebar />
      <Map />
    </div>
  );
}

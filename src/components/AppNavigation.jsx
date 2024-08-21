import styles from "./AppNavigation.module.css";
import { NavLink } from "react-router-dom";

export default function AppNavigation() {
  return (
    <div className={styles.appNav}>
      <NavLink to={"cities"}>Cities</NavLink>
      <NavLink to={"countries"}>Countries</NavLink>
    </div>
  );
}

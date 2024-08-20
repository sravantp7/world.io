import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <Link to={"/"} id={styles.logo}>
        <img src="/icon.png" alt="Logo" className={styles.logoImg} />
        <span>World.io</span>
      </Link>

      {/* Navbar menus */}
      <ul className={styles.menus}>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/login"} className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

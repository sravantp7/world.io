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
          <NavLink>Product</NavLink>
        </li>
        <li>
          <NavLink>Pricing</NavLink>
        </li>
        <li>
          <NavLink>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

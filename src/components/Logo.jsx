import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to={"/"} id={styles.logo}>
      <img src="/icon.png" alt="Logo" className={styles.logoImg} />
      <span>World.io</span>
    </Link>
  );
}

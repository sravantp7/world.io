import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNavigation from "./AppNavigation";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />
      <p>Countries List</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by World.io
        </p>
      </footer>
    </div>
  );
}

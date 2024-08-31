import styles from "./User.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { loggedIn, user, handleLogout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    handleLogout();

    // Navigating back to homepage after logout
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

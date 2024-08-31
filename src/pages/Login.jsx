import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@email.com");
  const [password, setPassword] = useState("admin");

  const { loggedIn, user, handleLogin } = useAuth();
  const navigate = useNavigate();

  // Redirecting user to the /app/cities after successful login
  useEffect(() => {
    if (loggedIn) {
      navigate("/app/cities", { replace: true }); // { replace: true } -> replace the previous location ie, login page by the new location /app/cities
      // and useful because when pressing back button we will go to main page instead of login page again
    }
  }, [loggedIn, navigate]);

  return (
    <main className={styles.login}>
      <Navbar />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            className={styles.btn}
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

import styles from "./Login.module.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("admin@email.com");
  const [password, setPassword] = useState("admin");

  const { loggedIn, setLoggedIn, handleLogin } = useAuth();

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

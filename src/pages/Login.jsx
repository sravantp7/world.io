import styles from "./Login.module.css";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin@email.com");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("User details submitted");
    console.log(email);
    console.log(password);
  }

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
          <button onClick={handleSubmit} className={styles.btn}>
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

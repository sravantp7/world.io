import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      {/* Navigation Menu */}
      <Navbar />
      <section>
        <h1>
          You travel the world.
          <br />
          <span className={styles.name}>World.io</span> keeps track of your
          adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={"/app"} className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}

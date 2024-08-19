import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.error_page}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Page Not Found.</p>
    </div>
  );
}

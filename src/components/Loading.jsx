import styles from "./Loading.module.css";

export default function Loading() {
  return (
    // <div className={styles.loader}>
    //   <h1>Loading...</h1>
    // </div>
    <div className={styles["spinner-container"]}>
      <div className={styles.spinner}>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
        <div className={styles["spinner-blade"]}></div>
      </div>
    </div>
  );
}

import React from "react";
import styles from "./index.module.css"; // Ensure this path is correct
import logo from "../../images/ResumeHub_Dark.jpg";

function WelcomePage() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Welcome" className={styles.welcomeImage} />
      <p className={styles.line}>
        Your all-in-one solution for resume perfection and job application
        success!
      </p>
      <button className={styles.getStartedButton}>Get Started</button>
    </div>
  );
}

export default WelcomePage;

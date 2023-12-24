import React from "react";
import styles from "./index.module.css"; // Ensure this path is correct
import logo from "../../images/ResumeHub_Dark.jpg";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Navigate to the desired route when the button is clicked
    navigate("/resume");
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Welcome" className={styles.welcomeImage} />
      <p className={styles.line}>
        Your all-in-one solution for resume perfection and job application
        success!
      </p>
      <button
        className={styles.getStartedButton}
        onClick={handleGetStartedClick}
      >
        Get Started
      </button>
    </div>
  );
}

export default WelcomePage;

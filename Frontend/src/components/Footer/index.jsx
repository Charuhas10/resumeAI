import styles from "./index.module.css";

function Footer() {
  return (
    <footer className={styles.Footer}>
      <p>&copy; 2023 ResumeAI</p>
      <p>
        <a
          href="mailto:charuhasreddybalam@gmail.com"
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          support@yourapp.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;

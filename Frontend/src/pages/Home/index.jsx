import ResumeUpload from "../../components/ResumeUpload";

import styles from "./index.module.css";

export default function HomePage() {
  return (
    <div className={styles.Page}>
      <ResumeUpload />
    </div>
  );
}

import ResumeUpload from "../../components/ResumeUpload";

import styles from "./index.module.css";

export default function HomePage({ onDataReceived }) {
  return (
    <div className={styles.Page}>
      <ResumeUpload onDataReceived={onDataReceived} />
    </div>
  );
}

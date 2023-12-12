import styles from "./index.module.css";
import Loader from "../Loader/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFile } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeUpload({ onDataReceived }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    handleSubmit(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      const selectedFile = event.dataTransfer.items[0].getAsFile();
      setFile(selectedFile);
      handleSubmit(selectedFile);
    }
  };

  const handleSubmit = async (selectedFile) => {
    if (selectedFile) {
      console.log("File selected: ", selectedFile.name);
      parseData(selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  const parseData = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      console.log("Sending file to the server...");
      const fileData = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!fileData.ok) {
        throw new Error(`Server responded with ${fileData.status}`);
      }
      const data = await fileData.json();
      console.log("Response from the server: ", data);
      sessionStorage.setItem("resumeData", JSON.stringify(data));
      onDataReceived(data);
      navigate("/display-data-resume");
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Resume Scanner</h1>
      <p className={styles.lineOne}>
        Scan your resume for a perfect match with the job description.
      </p>
      <p className={styles.lineTwo}>
        You can forget the hassle of manually checking your resume against job
        requirements. <br /> Now, easily ensure your resume aligns perfectly
        with your dream job.
      </p>
      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={styles.formContainer}>
          <form onDragOver={handleDragOver} onDrop={handleDrop}>
            <label className={styles.UploadBox}>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                name="file"
                className={styles.Picker}
              />
              <div className={styles.uploadboxel}>
                <div>
                  {file ? (
                    <FontAwesomeIcon icon={faFile} />
                  ) : (
                    <FontAwesomeIcon icon={faUpload} />
                  )}
                </div>
                <p>{file ? file.name : "Click to Upload or Drag and Drop"}</p>
              </div>
            </label>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;

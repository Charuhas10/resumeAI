import styles from "./index.module.css";
import Loader from "../Loader/";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeUpload({ onDataReceived }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleSubmit(file);
    fetchData();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      const file = event.dataTransfer.items[0].getAsFile();
      handleSubmit(file);
    }
  };

  const handleSubmit = (file) => {
    if (file) {
      console.log("File selected: ", file.name);
      parseData(file);
      // Later here we will make an API call to the backend
    } else {
      console.log("No file selected");
    }
  };

  // Inside a React component or hook
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      console.log(data.message); // Should log: "Hello from Flask!"
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  const parseData = async (file) => {
    setLoading(true); // Start loading
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
      navigate("/display-data");
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <form onDragOver={handleDragOver} onDrop={handleDrop}>
          <label className={styles.UploadBox}>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              name="file"
              className={styles.Picker}
            />
            Click to Upload or Drag and Drop
          </label>
        </form>
      )}
    </div>
  );
}

export default ResumeUpload;

import styles from "./index.module.css";
import Loader from "../Loader/";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// Use <Button> in your component

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CoverLetterUpload({ DataReceived }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // handleSubmit(file);
    // fetchData();
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      const selectedFile = event.dataTransfer.items[0].getAsFile();
      setFile(selectedFile);
      // handleSubmit(file);
    }
  };

  const handleSubmit = async (selectedFile, enteredText) => {
    if (selectedFile && enteredText) {
      console.log("File selected: ", selectedFile.name);
      console.log("Text entered: ", enteredText);
      try {
        await parseData(selectedFile, enteredText);
      } catch (error) {
        console.error("Error in handleSubmit:", error);
      }
    } else {
      console.log("No file selected or No text entered");
    }
  };

  const parseData = async (selectedFile, JD) => {
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("text", JD);
    try {
      console.log("Sending file to the server...");
      const fileData = await fetch("http://localhost:5000/uploadCV", {
        method: "POST",
        body: formData,
      });

      if (!fileData.ok) {
        throw new Error(`Server responded with ${fileData.status}`);
      }
      const data = await fileData.json();
      console.log("Response from the server: ", data);
      sessionStorage.setItem("resumeData", JSON.stringify(data));
      DataReceived(data);
      navigate("/display-data-cv");
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <h1>Cover Letter Generator</h1>
      <p>Writing a cover letter has never been so easy.</p>
      <p>
        With the ResumeHub cover letter tool, you don't have to worry about the
        hard and confusing parts of writing a cover letter. Now, you can quickly
        make a great cover letter and get the job you dream of!
      </p>
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
          <textarea
            className={styles.TextArea}
            placeholder="Enter your text here"
            value={text} // The text state variable
            onChange={handleTextChange} // Function to update the text state
          />
          <button
            type="button"
            onClick={() => handleSubmit(file, text)}
            disabled={!file || text.trim() === ""} // Button is disabled unless both file and text are present
            className={`btn btn-primary ${styles.SubmitButton}`}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default CoverLetterUpload;

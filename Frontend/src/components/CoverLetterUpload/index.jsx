import styles from "./index.module.css";
import Loader from "../Loader/";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
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
      sessionStorage.setItem("CVData", JSON.stringify(data));
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
      <p className={styles.lineOne}>
        Writing a cover letter has never been so easy.
      </p>
      <p className={styles.lineTwo}>
        With the ResumeHub cover letter tool, you dont have to worry about the
        hard and confusing parts of writing a cover letter. <br /> Now, you can
        quickly make a great cover letter and get the job you dream of!
      </p>
      {loading ? (
        <Loader />
      ) : (
        <form onDragOver={handleDragOver} onDrop={handleDrop}>
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center px-4 py-4"
            >
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
                    <svg
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                          stroke="#a8a8a8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                          stroke="#a8a8a8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>

                  <p>Click to Upload or Drag and Drop</p>
                </div>
              </label>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <textarea
                className={styles.TextArea}
                placeholder="Enter Job Description"
                value={text} // The text state variable
                onChange={handleTextChange} // Function to update the text state
              />
            </Col>
          </Row>
          {/* <div className={styles.formContainer}> */}
          {/* </div> */}

          <div className="d-flex justify-content-center px-1 py-1">
            <button
              type="button"
              onClick={() => handleSubmit(file, text)}
              disabled={!file || text.trim() === ""}
              className={`btn btn-primary ${styles.SubmitButton}`}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CoverLetterUpload;

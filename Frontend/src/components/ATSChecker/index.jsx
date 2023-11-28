import styles from "./index.module.css";
import Loader from "../Loader/";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// Use <Button> in your component

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ATSChecker({ ATSDataReceived }) {
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
        console.log("1. reached here");
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
      const fileData = await fetch("http://localhost:5000/uploadATS", {
        method: "POST",
        body: formData,
      });

      if (!fileData.ok) {
        console.log("2. i came till here");
        throw new Error(`Server responded with ${fileData.status}`);
      }
      const data = await fileData.json();
      console.log("SimilarityScore ", data);
      sessionStorage.setItem("ATSData", JSON.stringify(data));
      console.log("3. i came till here");
      ATSDataReceived(data);
      navigate("/display-data-ats");
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <h1>ATS Checker</h1>
      <p>Check your Resume and its compatability with the JD </p>
      <p>
        With the ResumeHub ATS checker, you dont have to worry about your resume
        getting rejected by the ATS. Just upload your resume and the JD and get
        the similarity score. The higher the score, the better the chances of
        your resume getting selected. Dont worry if your score is low, we have
        got you covered. Just create a resume using our resume builder and get
        the highest score possible.
      </p>
      {loading ? (
        <Loader />
      ) : (
        <form onDragOver={handleDragOver} onDrop={handleDrop}>
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
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
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                          stroke="#000000"
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

          <div className="d-flex justify-content-center">
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

export default ATSChecker;

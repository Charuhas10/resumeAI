import React, { useEffect } from "react";
import styles from "./index.module.css";
import Loader from "../Loader/";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFile } from "@fortawesome/free-solid-svg-icons";
// import Button from "react-bootstrap/Button";
// Use <Button> in your component

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ATSChecker({ ATSDataReceived }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState(null);
  // const navigate = useNavigate();
  useEffect(() => {
    if (responseData) {
      const circle = document.querySelector(".similarityRing circle");
      if (circle) {
        const circumference = 2 * Math.PI * 90;
        setTimeout(() => {
          circle.style.strokeDashoffset = 0;
        }, 100); // Adjust the delay as needed
      }
    }
  }, [responseData]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
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
      setResponseData(data);
      ATSDataReceived(data);
      // navigate("/display-data-ats");
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const getRingColor = (similarity) => {
    if (similarity <= 30) return "#FF0000"; // Red
    if (similarity <= 50) return "#FFA500"; // Orange
    if (similarity <= 70) return "#FFFF00"; // Yellow
    if (similarity <= 85) return "#00FF00"; // Light Green
    return "#008000"; // Dark Green
  };
  // const formatImprovements = (responseData) => {
  //   if (!responseData || !responseData.improvements) {
  //     return "";
  //   }

  //   const lines = responseData.improvements.split(". ");
  //   if (lines[0].trim() === "Suggested improvements") {
  //     lines.shift();
  //   }

  //   const formattedImprovements = lines.map(
  //     (line, index) => `${index + 1}. ${line.trim()}`
  //   );
  //   return formattedImprovements.join("\n");
  // };
  const DisplayData = () => {
    const ringColor = getRingColor(responseData.similarity);

    return (
      <div className={styles.similarityContainer}>
        <svg className={styles.similarityRing} viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke={ringColor}
            strokeWidth="10"
            fill="transparent"
            className={styles.animateCircle}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className={styles.similarityScore}
          >
            {responseData.similarity}%
          </text>
        </svg>
        {responseData.improvements}
      </div>
    );
  };
  return (
    <div className="container">
      <h1>ATS Checker</h1>
      <p className={styles.lineOne}>
        Make sure your resume fits the job description with our ATS Checker.
      </p>
      <p className={styles.lineTwo}>
        Simplify your ATS resume optimization with ResumeHub's tool. <br />
        Say goodbye to complexity and uncertainty; quickly enhance your resume
        for better job prospects!
      </p>
      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : responseData ? (
        <DisplayData />
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
                    {file ? (
                      <FontAwesomeIcon icon={faFile} />
                    ) : (
                      <FontAwesomeIcon icon={faUpload} />
                    )}
                  </div>
                  <p>{file ? file.name : "Click to Upload or Drag and Drop"}</p>
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
                value={text}
                onChange={handleTextChange}
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

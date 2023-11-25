import React, { useState } from "react";

function ATSChecker() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jdtxt: jobDescription, cvtxt: resumeText }),
    });

    if (response.ok) {
      const data = await response.json();
      setResult(data.result);
    } else {
      // Handle errors
      console.error("Error fetching data");
    }
  };

  return (
    <div>
      <h1>ATS Checker</h1>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Enter Job Description"
      />
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Enter Resume Text"
      />
      <button onClick={handleSubmit}>Check</button>
      {result && <div>Similarity Score: {result}%</div>}
    </div>
  );
}

export default ATSChecker;

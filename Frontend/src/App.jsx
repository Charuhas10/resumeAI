// import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import DisplayData from "./pages/DisplayData";
import CoverLetterUpload from "./components/CoverLetterUpload";

function App() {
  const [resumeData, setResumeData] = useState(
    JSON.parse(sessionStorage.getItem("resumeData")) || null
  );

  useEffect(() => {
    sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <BrowserRouter>
      <div>
        <h1 style={{ textAlign: "center" }}>ResumeAI</h1>
        <Routes>
          <Route
            path="/"
            element={<HomePage onDataReceived={setResumeData} />}
          />
          <Route
            path="/display-data"
            element={<DisplayData data={resumeData} />}
          />
          <Route path="/cover-letter" element={<CoverLetterUpload />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

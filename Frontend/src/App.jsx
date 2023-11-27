// import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// import Footer from "./components/Footer";
import HomePage from "./pages/Resume";
import DisplayDataResume from "./pages/DisplayDataResume";

import CoverLetterPage from "./pages/CoverLetter";
import DisplayDataCV from "./pages/DisplayDataCV";

import ATSCheckerPage from "./pages/ATSChecker";
import DisplayDataATS from "./pages/DisplayDataATS";
// import ATSChecker from "./components/ATSChecker";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [resumeData, setResumeData] = useState(
    JSON.parse(sessionStorage.getItem("resumeData")) || null
  );

  useEffect(() => {
    sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const [CVData, setCVData] = useState(
    JSON.parse(sessionStorage.getItem("CVData")) || null
  );

  useEffect(() => {
    sessionStorage.setItem("CVData", JSON.stringify(CVData));
  }, [CVData]);

  const [ATSData, setATSData] = useState(
    JSON.parse(sessionStorage.getItem("ATSData")) || null
  );

  useEffect(() => {
    sessionStorage.setItem("ATSData", JSON.stringify(ATSData));
  }, [ATSData]);

  return (
    <BrowserRouter>
      <div>
        {/* <h1 style={{ textAlign: "center" }}>ResumeAI</h1> */}
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<HomePage onDataReceived={setResumeData} />}
          />
          <Route
            path="/display-data-resume"
            element={<DisplayDataResume data={resumeData} />}
          />
          <Route
            path="/cv"
            element={<CoverLetterPage DataReceived={setCVData} />}
          />
          <Route
            path="/display-data-cv"
            element={<DisplayDataCV data={CVData} />}
          />
          <Route
            path="/ats"
            element={<ATSCheckerPage ATSDataReceived={setATSData} />}
          />
          <Route
            path="/display-data-ats"
            element={<DisplayDataATS data={ATSData} />}
          />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

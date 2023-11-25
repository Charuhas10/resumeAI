// import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import DisplayDataResume from "./pages/DisplayDataResume";
import DisplayDataCV from "./pages/DisplayDataCV";
import CoverLetter from "./pages/CoverLetter";
import ATSChecker from "./components/ATSChecker";
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
            element={<CoverLetter DataReceived={setCVData} />}
          />
          <Route
            path="/display-data-cv"
            element={<DisplayDataCV data={CVData} />}
          />
          <Route path="/ats-checker" element={<ATSChecker />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

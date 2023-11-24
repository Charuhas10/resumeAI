// import React from "react";
import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import DisplayData from "./pages/DisplayData";

function App() {
  const [resumeData, setResumeData] = useState(null);

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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

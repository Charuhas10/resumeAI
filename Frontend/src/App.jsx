// import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import DisplayData from "./pages/DisplayData";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 style={{ textAlign: "center" }}>ResumeAI</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/display-data" element={<DisplayData />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

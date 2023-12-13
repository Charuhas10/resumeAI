import React, { useState } from "react";

import { Editor } from "./Editor";

const App_style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  // border: "1px solid red",
  // height: "100vh",
};

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  margin: "20px",
};

// New style for the button
const buttonStyle = {
  padding: "5px 10px", // Smaller size
  alignSelf: "flex-end", // Align to the right side
  marginRight: "20px", // Margin on the right for some spacing
  backgroundColor: "#3a8891",
  border: "#3a8891",
  borderRadius: "10px",
  color: "white",
};

function ResumeBuilder() {
  const [signal, setSignal] = useState(0);

  return (
    <div className="App" style={App_style}>
      <header style={headerStyle}>
        <h1>Resume Builder</h1>
      </header>
      <button style={buttonStyle} onClick={() => setSignal(signal + 1)}>
        Print
      </button>
      <Editor signal={signal} />
    </div>
  );
}

export default ResumeBuilder;

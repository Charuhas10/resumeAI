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
  justifyContent: "space-between",
  margin: "20px",
};

function ResumeBuilder() {
  const [signal, setSignal] = useState(0);

  return (
    <div className="App" style={App_style}>
      <header style={headerStyle}>
        <h1>Resume Builder</h1>
        <button onClick={() => setSignal(signal + 1)}>Print</button>
      </header>
      <Editor signal={signal} />
    </div>
  );
}

export default ResumeBuilder;

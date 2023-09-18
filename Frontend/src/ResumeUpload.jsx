import { useState } from "react";

function ResumeUpload() {
  const [resume, setResume] = useState(null);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (resume) {
      console.log("File selected: ", resume.name);
      // Later here we will make an API call to the backend
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload Resume</button>
    </div>
  );
}

export default ResumeUpload;

function ResumeUpload() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleSubmit(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      const file = event.dataTransfer.items[0].getAsFile();
      handleSubmit(file);
    }
  };

  const handleSubmit = (file) => {
    if (file) {
      console.log("File selected: ", file.name);
      parseData(file);
      // Later here we will make an API call to the backend
    } else {
      console.log("No file selected");
    }
  };

  const openFileDialog = () => {
    document.getElementById("fileInput").click();
  };

  // Inside a React component or hook
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      console.log(data.message); // Should log: "Hello from Flask!"
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  const parseData = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const fileData = await fetch("http://localhost:5000/pdf", {
        method: "POST",
        body: formData,
      });

      if (!fileData.ok) {
        throw new Error(`Server responded with ${fileData.status}`);
      }

      const data = await fileData.json();
      console.log(data.text);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  const handleDivClick = () => {
    openFileDialog();
    fetchData();
    // parseData();
  };

  return (
    <div
      onClick={handleDivClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: "2px dashed #000",
        padding: "20px",
        width: "300px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".pdf"
      />
      <p>Click to Upload or Drag and Drop</p>
    </div>
  );
}

export default ResumeUpload;

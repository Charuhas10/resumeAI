import styles from "./ResumeUpload.module.css";

function ResumeUpload() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleSubmit(file);
    fetchData();
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
    formData.append("file", file);
    try {
      console.log("Sending file to the server...");
      const fileData = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!fileData.ok) {
        throw new Error(`Server responded with ${fileData.status}`);
      }

      const data = await fileData.json();
      console.log("Response from the server: ", data);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  return (
    <div style={stylesOld.page}>
      <form onDragOver={handleDragOver} onDrop={handleDrop}>
        <label className={styles.UploadBox}>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            name="file"
            className={styles.Picker}
          />
          Click to Upload or Drag and Drop
        </label>
      </form>
    </div>
  );
}

const stylesOld = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4", // Simple background color
    fontFamily: '"Roboto", sans-serif',
  },
  uploadBox: {
    border: "2px dashed #000",
    padding: "30px", // Increased padding for a bigger box
    width: "400px", // Increased width
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
  },
  uploadText: {
    margin: 0,
    fontSize: "18px", // Slightly increased font size for clarity
  },
};

export default ResumeUpload;

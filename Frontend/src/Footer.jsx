function Footer() {
  const footerStyle = {
    width: "100%",
    backgroundColor: "#282c34",
    color: "white",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    bottom: "0",
    left: "0",
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; 2023 ResumeAI</p>
      <p>
        <a
          href="mailto:charuhasreddybalam@gmail.com"
          style={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          support@yourapp.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;

// NavbarComponent.jsx
import styles from "./index.module.css";
import logo from "../../images/ResumeHub_Dark.jpg";

function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.navLinksContainer}`}>
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/">
                Resume Scanner
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cv">
                Cover Letter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/resume-builder">
                Resume Builder
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ats">
                ATS Checker
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

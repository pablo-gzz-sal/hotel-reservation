import React from "react";
import "./styles.css";

function Footer() {
  return (
    <div className="footer">
      <span>© 2021— Pablo Gonzalez Salcido</span>
      <div className="redes">
        <a
          href="https://github.com/pablo-gzz-sal/Code-Your-Future"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/pablo-gonzalez-salcido-bb1a491a9/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          href="https://twitter.com/salcidopablo7"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://vigorous-goldberg-d63323.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-podcast"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;

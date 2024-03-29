import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="centerContainer">
        {" "}
        <div className="githubContainer">
          <p className="githubContainer">
            Developed with ❤️ by{" "}
            <a
              className="githubContainerAshiya"
              href="https://github.com/ashiyaman"
              target="_blank"
            >
              <i className="fab fa-github"></i>Ashiya
            </a>
            ,{" "}
            <a
              className="githubContainerDilip"
              href="https://github.com/bitscurrent"
              target="_blank"
            >
              <i className="fab fa-github"></i>Dilip
            </a>
            ,{" "}
            <a
              className="githubContainerDinesh"
              href="https://github.com/itzmidinesh"
              target="_blank"
            >
              <i className="fab fa-github"></i>Dinesh
            </a>
          </p>
        </div>
        <a
          className="repoLink"
          target="_blank"
          href="https://github.com/chingu-voyages/v47-tier2-team-11"
        >
          <i className="fab fa-github" style={{ fontSize: "18px" }}></i>
        </a>{" "}
        © 2024{" "}
        <a className="chinguLink" target="_blank" href="https://www.chingu.io/">
          Chingu
        </a>{" "}
        Voyage 47 Team 11{" "}
      </div>
    </footer>
  );
};

export default Footer;

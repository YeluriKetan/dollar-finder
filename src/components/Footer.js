import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info-container">
        <div className="footer-column">
          <h3 className="footer-heading">Winston Cahya</h3>
          <ul className="footer-list">
            <li>
              <a
                href="https://github.com/CommanderW324"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/winston-cahya/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto: winstoncahya90@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Yeluri Ketan</h3>
          <ul className="footer-list">
            <li>
              <a
                href="https://github.com/YeluriKetan"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ketanyeluri"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto: ketany309@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">$FINDER</h3>
          <p className="footer-para">
            "FIND the best deals,
            <br />
            and save your DOLLARS".
            <br />
            <br />
            an AY20-21 Orbital Project
            <br />
            by students of SoC NUS.
          </p>
        </div>
      </div>
      <p className="copyright">$FINDER - Dollar Finder © 2021</p>
    </footer>
  );
}

export default Footer;

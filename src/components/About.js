import React from "react";
import "./about.css";
import ProposalPoster from "./../images/2399.png";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import OndemandVideoOutlinedIcon from "@material-ui/icons/OndemandVideoOutlined";
import { makeStyles } from "@material-ui/core";

const useStylesAbout = makeStyles({
  iconLink: {
    color: "#413c58",
    width: "3rem",
    height: "3rem",
  },
  "@media (max-width: 600px)": {
    width: "1rem",
    height: "1rem",
  },
});
function About() {
  return (
    <main className="about-main">
      <h2 className="section-heading">Proposal</h2>
      <section className="about-section proposal">
        <article className="about-article">
          <h3 className="article-heading">Proposal Poster</h3>
          <img
            src={ProposalPoster}
            alt="Dollar Finder Proposal"
            className="proposal-img"
          />
        </article>
        <article className="about-article">
          <h3 className="article-heading">Proposal Video</h3>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Z7pfjg0NKnU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="proposal-video"
          ></iframe>
        </article>
      </section>
      <h2 className="section-heading">Milestone 1</h2>
      <section className="about-section milestone-1">
        <article className="about-article">
          <h3 className="article-heading">Project README</h3>
          <a
            href="https://docs.google.com/document/d/107ib214TH-uZ9TXZ_i7-ujnqCSkYKPyHTjYtb-ZLOwE/edit"
            target="_blank"
            rel="noreferrer"
            className="about-icon-link"
          >
            <DescriptionOutlinedIcon className={useStylesAbout().iconLink} />
          </a>
        </article>
        <article className="about-article">
          <h3 className="article-heading">Project Log</h3>
          <a
            href="https://drive.google.com/file/d/1ksECiulFiFOZS4ZRUFJK-EW4ztolf1gk/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="about-icon-link"
          >
            <PictureAsPdfOutlinedIcon className={useStylesAbout().iconLink} />
          </a>
        </article>
        <article className="about-article">
          <h3 className="article-heading">Project Video</h3>
          <a
            href="https://drive.google.com/file/d/1j6tmzAIlCIHKGod7U27tmAB_k1SKF66U/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="about-icon-link"
          >
            <OndemandVideoOutlinedIcon className={useStylesAbout().iconLink} />
          </a>
        </article>
      </section>
      <h2 className="section-heading">Milestone 2</h2>
      <section className="about-section milestone-2">
        <article className="about-article">
          <h3 className="article-heading">Project README</h3>
          <a
            href="https://docs.google.com/document/d/1sopNupdRmtpP565OMMtxEXou868BZIe0KRtIh6Bo1rE/edit"
            target="_blank"
            rel="noreferrer"
            className="about-icon-link"
          >
            <DescriptionOutlinedIcon className={useStylesAbout().iconLink} />
          </a>
        </article>
        <article className="about-article">
          <h3 className="article-heading">Project Log</h3>
          <a
            href="https://docs.google.com/document/d/1oBLwwLK7aOVL98dRd1prHLtYYkVnNeel-qIi7FawFzk/edit"
            target="_blank"
            rel="noreferrer"
            className="about-icon-link"
          >
            <PictureAsPdfOutlinedIcon className={useStylesAbout().iconLink} />
          </a>
        </article>
        <article className="about-article">
          <h3 className="article-heading">Project Video</h3>
          <a
            href="https://drive.google.com/file/d/1bpmwSVqD94PSSGDg9Qx8-XI1yI5ZIhQR/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="about-icon-link"
          >
            <OndemandVideoOutlinedIcon className={useStylesAbout().iconLink} />
          </a>
        </article>
      </section>
      <h2 className="section-heading">Milestone 3</h2>
      <section className="about-section milestone-3">
        <h3 className="article-heading">Coming Soon...</h3>
      </section>
    </main>
  );
}

export default About;

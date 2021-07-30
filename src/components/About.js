import React from "react";
import "./about.css";
import Demo1 from "./../images/Demo1.mp4";
import Demo2 from "./../images/Demo2F.mp4";
import Demo3 from "./../images/Demo3.mp4";
import Demo4 from "./../images/Demo4.mp4";

function About() {
  return (
    <main className="about-main">
      <div className="about-demo-article about-demo-article-reverse">
        <div className="about-demo-video-div">
          <video
            width="500"
            autoPlay
            loop
            muted
            preload="none"
            className="about-demo-video"
          >
            <source src={Demo1} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
        <div className="about-demo-section">
          <h3 className="about-demo-h3">Step 1</h3>
          <h4 className="about-demo-h4">Sort and Compare</h4>
        </div>
      </div>
      <div className="about-demo-article">
        <div className="about-demo-section">
          <h3 className="about-demo-h3">Step 2</h3>
          <h4 className="about-demo-h4">
            View detailed information like location of the store
          </h4>
        </div>
        <div className="about-demo-video-div">
          <video
            width="500"
            autoPlay
            loop
            muted
            preload="none"
            className="about-demo-video"
          >
            <source src={Demo2} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      </div>
      <div className="about-demo-article about-demo-article-reverse">
        <div className="about-demo-video-div">
          <video
            width="500"
            autoPlay
            loop
            muted
            preload="none"
            className="about-demo-video"
          >
            <source src={Demo3} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
        <div className="about-demo-section">
          <h3 className="about-demo-h3">Step 3</h3>
          <h4 className="about-demo-h4">Login or SignUp</h4>
        </div>
      </div>
      <div className="about-demo-article">
        <div className="about-demo-section">
          <h3 className="about-demo-h3">Step 4</h3>
          <h4 className="about-demo-h4">Post and share new deals</h4>
        </div>
        <div className="about-demo-video-div">
          <video
            width="500"
            autoPlay
            loop
            muted
            preload="none"
            className="about-demo-video"
          >
            <source src={Demo4} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      </div>
    </main>
  );
}

export default About;

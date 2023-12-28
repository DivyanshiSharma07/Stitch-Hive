import React from 'react';
import './styles/Intro.css';

const Intro = () => {
  return (
    <section className="intro-section">
      <div className="intro-content">
        <h1 className="intro-heading">
          <span className="intro-heading-color intro-heading-text">Elevate Your Style: </span><br />
          <span className="intro-heading-color intro-heading-text"> Seamlessly Connect,</span>
          <span className="intro-heading-color intro-heading-text"> Tailor Your Fashion Journey</span>
        </h1>
        <p className="intro-subheading">Tailored Elegance Unleashed</p>
      </div>
    </section>
  );
};

export default Intro;

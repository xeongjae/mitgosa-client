import React from "react";
import "./HeroSection.scss";
import UrlInputForm from "../UrlInputForm/UrlInputForm";

function HeroSection() {
  return (
    <section className="hero-section">
        <div className="inner-container">
          <img src="/mgslogo.png" alt="logo" className="main-image" />
          <UrlInputForm />
        </div>
    </section>
  );
}

export default HeroSection;

import React from "react";
import "./ReviewAnalyzer.scss";
import UrlInputForm from "../UrlInputForm/UrlInputForm";

function ReviewAnalyzer() {
  return (
    <section className="hero-section">
        <img src="/mgslogo.png" alt="logo" className="main-logo-image" />
        <UrlInputForm />
    </section>
  );
}

export default ReviewAnalyzer;

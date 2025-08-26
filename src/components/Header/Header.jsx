import React from "react";
import "./Header.scss";

function Header() {
  const urls = {
    portfolio: "https://seongjae-portfolio.netlify.app/",
    feedback: "https://docs.google.com/forms/...",
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  const openPortfolio = () => {
    window.open(urls.portfolio, "_blank");
  };

  const copyCurrentUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch(() => {
        alert("링크 복사에 실패했습니다.");
      });
  };

  const openFeedback = () => {
    window.open(urls.feedback, "_blank");
  };

  return (
    <header className="header-container">
      <div className="header-layout-container">
        <div className="logo" onClick={navigateToHome}>
          믿고사
        </div>
        <div className="header-category-box">
          <button
            className="header-category-item"
            onClick={openPortfolio}
            type="button"
          >
            포트폴리오
          </button>
          <button
            className="header-category-item"
            onClick={copyCurrentUrl}
            type="button"
          >
            링크복사
          </button>
          <button
            className="header-category-item"
            onClick={openFeedback}
            type="button"
          >
            피드백
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

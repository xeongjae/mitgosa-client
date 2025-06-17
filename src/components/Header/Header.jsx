import React from "react";
import "./Header.scss"; // Import the SCSS file directly

function Header() {
  // 홈으로 이동 기능
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  // URL 복사 기능
  const handleShareLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch(() => {
        alert("링크 복사에 실패했습니다. 다시 시도해주세요.");
      });
  };

  // 포트폴리오 링크 이동
  const handlePortfolio = () => {
    window.open("https://seongjae-portfolio.netlify.app/", "_blank");
  };

  // 피드백 기능 (구글 폼 연결)
  const handleFeedback = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdRTOL98fGuEgfmmCPufO3U7GTrDn60__gyAcUbQoNoGa_LIA/viewform?usp=dialog",
      "_blank"
    );
  };

  return (
    // Use string literals for class names
    <header className="header-container">
      <div className="logo" onClick={handleLogoClick}>
        믿고사
      </div>
      <div className="header-right">
        <button
          className="header-right-item"
          onClick={handleShareLink}
          type="button"
        >
          링크복사
        </button>
        <button
          className="header-right-item"
          onClick={handlePortfolio}
          type="button"
        >
          포트폴리오
        </button>
        <button
          className="header-right-item"
          onClick={handleFeedback}
          type="button"
        >
          피드백
        </button>
      </div>
    </header>
  );
}

export default Header;

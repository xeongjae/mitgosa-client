import React from "react";
import "./Footer.scss";

function Footer() {
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
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <p>
            믿고사 (MITGOSA) | 본 사이트는 상업적 목적이 아닌 학습을 위해
            제작되었습니다.
          </p>
          <p>전화: 010-62-7-0840 | 이메일: newsungjae0407@gmail.com</p>
          <p>© 2025 Kim Sungjae. All rights reserved.</p>
        </div>

        <div className="quick-links">
          <button
            className="quick-link"
            onClick={handleShareLink}
            type="button"
          >
            링크공유
          </button>
          <button
            className="quick-link"
            onClick={handlePortfolio}
            type="button"
          >
            포트폴리오
          </button>
          <button className="quick-link" onClick={handleFeedback} type="button">
            피드백
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

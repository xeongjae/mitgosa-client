import React, { useState, useRef, useEffect } from "react";
import "./ResultHeader.scss";
import { useNavigate } from "react-router-dom";

function ResultHeader() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("musinsa");
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

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

  // 지원 플랫폼 목록
  const platforms = [
    { value: "musinsa", label: "무신사", logo: "/musinsa.png" },
    { value: "29cm", label: "29CM", logo: "/29cm.png" },
    { value: "ably", label: "에이블리", logo: "/ably.png" },
    { value: "zigzag", label: "지그재그", logo: "/zigzag.png" },
    { value: "wconcept", label: "W컨셉", logo: "/wconcept.png" },
  ];

  // 현재 선택된 플랫폼 정보
  const selectedPlatform = platforms.find((p) => p.value === platform);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // 플랫폼 버튼 클릭이 아닌 경우에만 모달 닫기
        const platformButton = document.getElementById("platformSelect");
        if (platformButton && !platformButton.contains(event.target)) {
          setShowPlatformModal(false);
        }
      }
    };

    if (showPlatformModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPlatformModal]);

  // 플랫폼 선택 핸들러
  const handlePlatformSelect = (platformValue) => {
    setPlatform(platformValue);
    setShowPlatformModal(false);
  };

  // 플랫폼 버튼 클릭 핸들러 (토글 기능)
  const handlePlatformButtonClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setShowPlatformModal(!showPlatformModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    try {
      const response = await fetch("https://mitgosa.onrender.com/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        // result 페이지로 이동하면서 분석 결과 전달
        navigate("/result", {
          state: {
            analysisData: data,
          },
        });
      }
    } catch (error) {
      console.error("분석 요청 에러:", error);
    }
  };

  return (
    <>
      <header className="result-header-container">
        <div className="result-logo" onClick={handleLogoClick}>
          믿고사
        </div>
        <div className="result-page-search-form-container">
          <div>
            <form className="search-form" onSubmit={handleSubmit}>
              <div className="region-selector">
                <div className="region-inner">
                  <div>
                    <label htmlFor="platformSelect" className="hidden">
                      platformSelect
                    </label>
                    <button
                      id="platformSelect"
                      type="button"
                      value={platform}
                      className={`platform-button ${
                        showPlatformModal ? "open" : ""
                      }`}
                      onClick={handlePlatformButtonClick}
                    >
                      <span className="hidden-mobile">
                        {selectedPlatform ? selectedPlatform.label : "선택"}
                      </span>
                      <span className="hidden">, </span>
                      <span className="mobile-only">
                        {selectedPlatform ? selectedPlatform.label : "선택"}
                      </span>
                    </button>
                    <input type="hidden" value={platform} name="platform" />
                  </div>
                </div>

                {/* 플랫폼 모달을 region-selector 내부로 이동 */}
                {showPlatformModal && (
                  <div className="platform-modal" ref={modalRef}>
                    <div className="platform-modal-content">
                      <div className="platform-list">
                        {platforms.map((platform) => (
                          <div
                            key={platform.value}
                            className="platform-item"
                            onClick={() => handlePlatformSelect(platform.value)}
                          >
                            <span>{platform.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="productUrl" className="sr-only">
                  상품 URL 검색
                </label>
                <input
                  id="productUrl"
                  autoComplete="off"
                  className="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="상품 링크를 입력해주세요"
                  name="productUrl"
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                aria-label="상품 검색"
              >
                <span className="go-text">.GO</span>
              </button>
            </form>
          </div>
        </div>
        <div className="result-header-right">
          <button
            className="result-header-right-item"
            onClick={handleShareLink}
            type="button"
          >
            링크복사
          </button>
          <button
            className="result-header-right-item"
            onClick={handlePortfolio}
            type="button"
          >
            포트폴리오
          </button>
          <button
            className="result-header-right-item"
            onClick={handleFeedback}
            type="button"
          >
            피드백
          </button>
        </div>
      </header>
    </>
  );
}

export default ResultHeader;

import React, { useState, useRef, useEffect } from "react";
import "./UrlInputForm.scss";
import { useNavigate } from "react-router-dom";

function UrlInputForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("musinsa");
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

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
      setError("URL을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Result 페이지로 이동하면서 분석 결과 전달
        navigate("/Result", {
          state: {
            analysisData: data,
          },
        });
      } else {
        setError(data.error || "분석 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("분석 요청 에러:", error);
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search-form-container">
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
                    <span className="hidden-mobile">platform</span>
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
              <span className="input-label">search</span>
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

      {/* 메시지를 위한 고정된 공간 */}
      <div className="message-container">
        {loading && (
          <div className="loading-message">AI가 리뷰를 분석 중입니다...</div>
        )}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && <div className="message-placeholder"></div>}
      </div>
    </>
  );
}

export default UrlInputForm;

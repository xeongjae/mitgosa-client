import React, { useState, useRef, useEffect } from "react";
import "./UrlInputForm.scss";
import { useNavigate } from "react-router-dom";

function UrlInputForm() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("musinsa");
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const loadingCleanupRef = useRef(null);
  const navigate = useNavigate();

  // 로딩 애니메이션
  const createLoadingBar = (inputElement, duration = 10000) => {
    const startTime = Date.now();
    let animationId;

    function updateLoadingBar() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      inputElement.style.setProperty("--loading-progress", `${progress}%`);
      setLoadingProgress(Math.round(progress));

      if (progress < 100) {
        animationId = requestAnimationFrame(updateLoadingBar);
      }
    }

    animationId = requestAnimationFrame(updateLoadingBar);
    return () => cancelAnimationFrame(animationId);
  };

  // 지원 플랫폼 목록
  const platforms = [
    {
      value: "musinsa",
      label: "무신사",
      logo: "/musinsa.png",
      supported: true,
    },
    { value: "29cm", label: "29CM", logo: "/29cm.png", supported: false },
    { value: "ably", label: "에이블리", logo: "/ably.png", supported: false },
    {
      value: "zigzag",
      label: "지그재그",
      logo: "/zigzag.png",
      supported: false,
    },
    {
      value: "wconcept",
      label: "W컨셉",
      logo: "/wconcept.png",
      supported: false,
    },
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
  const handlePlatformSelect = (platformValue, isSupported) => {
    if (!isSupported) {
      return; // 지원하지 않는 플랫폼은 선택되지 않음
    }
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
    setLoadingProgress(0);
    setError(null);

    let hasError = false;

    const searchForm = document.querySelector(".search-form");
    if (searchForm) {
      searchForm.style.setProperty("--loading-progress", "0%");
      searchForm.classList.add("loading");

      setTimeout(() => {
        const cleanup = createLoadingBar(searchForm, 15000);
        loadingCleanupRef.current = cleanup;
      }, 50);
    }

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
        if (loadingCleanupRef.current) {
          loadingCleanupRef.current();
          loadingCleanupRef.current = null;
        }

        if (searchForm) {
          searchForm.style.transition = "--loading-progress 0.5s ease-out";
          searchForm.style.setProperty("--loading-progress", "100%");
          setLoadingProgress(100);

          setTimeout(() => {
            searchForm.classList.remove("loading");
            searchForm.style.removeProperty("--loading-progress");
            searchForm.style.removeProperty("transition");
            navigate("/Result", {
              state: {
                analysisData: data,
              },
            });
          }, 600);
        } else {
          navigate("/Result", {
            state: {
              analysisData: data,
            },
          });
        }
      } else {
        hasError = true;
        setError(data.error || "분석 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("분석 요청 에러:", error);
      hasError = true;
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      if (loadingCleanupRef.current) {
        loadingCleanupRef.current();
        loadingCleanupRef.current = null;
      }

      if (hasError) {
        if (searchForm) {
          searchForm.classList.remove("loading");
          searchForm.style.removeProperty("--loading-progress");
        }
        setLoading(false);
        setLoadingProgress(0);
      }
    }
  };

  // 컴포넌트 언마운트시 정리
  useEffect(() => {
    return () => {
      if (loadingCleanupRef.current) {
        loadingCleanupRef.current();
      }
    };
  }, []);

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
                ref={inputRef}
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

          {showPlatformModal && (
            <div className="platform-modal" ref={modalRef}>
              <div className="platform-modal-content">
                <div className="platform-list">
                  {platforms.map((platform) => (
                    <div
                      key={platform.value}
                      className={`platform-item ${
                        platform.supported ? "" : "unsupported"
                      }`}
                      onClick={() =>
                        handlePlatformSelect(platform.value, platform.supported)
                      }
                    >
                      <span>{platform.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 메시지를 위한 고정된 공간 */}
      <div className="message-container">
        {loading && (
          <div className="loading-message">
            {loadingProgress < 100 ? (
              <>
                AI가 리뷰를 분석 중입니다...
                <span className="progress-number">{loadingProgress}%</span>
              </>
            ) : (
              "잠시만 기다려주세요..."
            )}
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && <div className="message-placeholder"></div>}
      </div>
    </>
  );
}

export default UrlInputForm;

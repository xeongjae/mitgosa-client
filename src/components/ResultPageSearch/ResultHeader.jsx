import React, { useState, useRef, useEffect } from "react";
import "./ResultHeader.scss";
import { useNavigate } from "react-router-dom";

function ResultHeader() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("musinsa");
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const modalRef = useRef(null);
  const loadingCleanupRef = useRef(null);
  const navigate = useNavigate();

  const createLoadingBar = (inputElement, duration = 10000) => {
    const startTime = Date.now();
    let animationId;

    function updateLoadingBar() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      inputElement.style.setProperty("--loading-progress", `${progress}%`);

      if (progress < 100) {
        animationId = requestAnimationFrame(updateLoadingBar);
      }
    }

    animationId = requestAnimationFrame(updateLoadingBar);
    return () => cancelAnimationFrame(animationId);
  };

  const handleLogoClick = () => {
    window.location.href = "/";
  };

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

  const handlePortfolio = () => {
    window.open("https://seongjae-portfolio.netlify.app/", "_blank");
  };

  const handleFeedback = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdRTOL98fGuEgfmmCPufO3U7GTrDn60__gyAcUbQoNoGa_LIA/viewform?usp=dialog",
      "_blank"
    );
  };

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

  const selectedPlatform = platforms.find((p) => p.value === platform);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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

  useEffect(() => {
    return () => {
      if (loadingCleanupRef.current) {
        loadingCleanupRef.current();
      }
    };
  }, []);

  const handlePlatformSelect = (platformValue, isSupported) => {
    if (!isSupported) {
      return;
    }
    setPlatform(platformValue);
    setShowPlatformModal(false);
  };

  const handlePlatformButtonClick = (e) => {
    e.stopPropagation();
    setShowPlatformModal(!showPlatformModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    const searchForm = document.querySelector(
      ".result-page-search-form-container .search-form"
    );
    if (searchForm) {
      searchForm.style.setProperty("--loading-progress", "0%");
      searchForm.classList.add("loading");

      setTimeout(() => {
        const cleanup = createLoadingBar(searchForm, 5000);
        loadingCleanupRef.current = cleanup;
      }, 50);
    }

    try {
      const response = await fetch("http://localhost:4000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        if (loadingCleanupRef.current) {
          loadingCleanupRef.current();
          loadingCleanupRef.current = null;
        }

        if (searchForm) {
          searchForm.style.transition = "--loading-progress 0.5s ease-out";
          searchForm.style.setProperty("--loading-progress", "100%");

          setTimeout(() => {
            searchForm.classList.remove("loading");
            searchForm.style.removeProperty("--loading-progress");
            searchForm.style.removeProperty("transition");
            navigate("/result", {
              state: {
                analysisData: data,
              },
            });
          }, 600);
        } else {
          navigate("/result", {
            state: {
              analysisData: data,
            },
          });
        }
      }
    } catch (error) {
      console.error("분석 요청 에러:", error);
    } finally {
      if (loadingCleanupRef.current) {
        loadingCleanupRef.current();
        loadingCleanupRef.current = null;
      }

      if (searchForm) {
        searchForm.classList.remove("loading");
        searchForm.style.removeProperty("--loading-progress");
      }
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
                          handlePlatformSelect(
                            platform.value,
                            platform.supported
                          )
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

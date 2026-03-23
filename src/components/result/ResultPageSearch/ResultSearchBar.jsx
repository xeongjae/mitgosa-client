import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ResultSearchBar.scss";

function ResultSearchBar() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("musinsa");
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const formRef = useRef(null);
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

  const platforms = [
    { value: "musinsa", label: "무신사", logo: "/musinsa.png", supported: true },
    { value: "29cm", label: "29CM", logo: "/29cm.png", supported: false },
    { value: "ably", label: "에이블리", logo: "/ably.png", supported: false },
    { value: "zigzag", label: "지그재그", logo: "/zigzag.png", supported: false },
    { value: "wconcept", label: "W컨셉", logo: "/wconcept.png", supported: false },
  ];

  const selectedPlatform = platforms.find((p) => p.value === platform);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
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

    const searchForm = formRef.current;

    if (searchForm) {
      searchForm.style.setProperty("--loading-progress", "0%");
      searchForm.classList.add("loading");

      setTimeout(() => {
        const cleanup = createLoadingBar(searchForm, 5000);
        loadingCleanupRef.current = cleanup;
      }, 50);
    }

    try {
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${API_BASE}/api/analyze`, {
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
            navigate("/result", { state: { analysisData: data } });
          }, 600);
        } else {
          navigate("/result", { state: { analysisData: data } });
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
    <div className="result-page-search-form-container">
      <form ref={formRef} className="search-form" onSubmit={handleSubmit}>
        <div className="region-selector">
          <div className="region-inner">
            <div>
              <label className="hidden">
                platformSelect
              </label>
              <button
                ref={buttonRef}
                type="button"
                value={platform}
                className={`platform-button ${showPlatformModal ? "open" : ""}`}
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
          <label htmlFor="resultProductUrl" className="sr-only">
            상품 URL 검색
          </label>
          <input
            id="resultProductUrl"
            autoComplete="off"
            className="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="상품 링크를 입력해주세요"
            name="productUrl"
          />
        </div>

        <button type="submit" className="submit-button" aria-label="상품 검색">
          <span className="go-text">.GO</span>
        </button>
      </form>

      {showPlatformModal && (
        <div className="platform-modal" ref={modalRef}>
          <div className="platform-modal-content">
            <div className="platform-list">
              {platforms.map((platformItem) => (
                <div
                  key={platformItem.value}
                  className={`platform-item ${platformItem.supported ? "" : "unsupported"}`}
                  onClick={() =>
                    handlePlatformSelect(platformItem.value, platformItem.supported)
                  }
                >
                  <span>{platformItem.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultSearchBar;

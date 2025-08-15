import React, { useState, useEffect } from "react";
import "./AnalysisResult.scss";

const AnalysisResult = ({ result }) => {
  // 애니메이션 상태 관리
  const [visibleElements, setVisibleElements] = useState({
    resultSection: false,
    topMidSection: false,
    bottomSection1: false,
    bottomSection2: false,
  });

  // 순차적 애니메이션 트리거
  useEffect(() => {
    // 애니메이션 초기화
    setVisibleElements({
      resultSection: false,
      topMidSection: false,
      bottomSection1: false,
      bottomSection2: false,
    });

    const timeouts = [];

    // 각 요소를 더 자연스럽게 순차적으로 나타내기
    timeouts.push(
      setTimeout(() => {
        setVisibleElements((prev) => ({ ...prev, resultSection: true }));
      }, 300)
    );

    timeouts.push(
      setTimeout(() => {
        setVisibleElements((prev) => ({ ...prev, topMidSection: true }));
      }, 800)
    );

    timeouts.push(
      setTimeout(() => {
        setVisibleElements((prev) => ({ ...prev, bottomSection1: true }));
      }, 1300)
    );

    timeouts.push(
      setTimeout(() => {
        setVisibleElements((prev) => ({ ...prev, bottomSection2: true }));
      }, 1800)
    );

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [result]); // result가 변경될 때마다 애니메이션 재실행

  // 에러 처리
  if (!result || !result.success) {
    return (
      <div className="error-section">
        <h2>분석 결과를 불러올 수 없습니다</h2>
        <p>{result?.error || result?.message || "분석 실패"}</p>
      </div>
    );
  }

  const analysisData = result.data;
  const product = result.product;

  // ratio 파싱
  const parseRatio = (ratioString) => {
    const ratios = ratioString.split(":").map(Number);
    const total = ratios.reduce((sum, ratio) => sum + ratio, 0);
    return ratios.map((ratio) => (ratio / total) * 100);
  };

  const ratioPercentages = parseRatio(analysisData.ratio);
  const [prosPercent, neutralPercent, consPercent] = ratioPercentages;

  // SVG 원형 차트
  const createDonutPath = (
    percentage,
    startAngle,
    radius = 44,
    strokeWidth = 12
  ) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const innerRadius = radius - strokeWidth;
    const outerRadius = radius;

    const x1 = 45 + outerRadius * Math.cos(startAngleRad);
    const y1 = 45 + outerRadius * Math.sin(startAngleRad);
    const x2 = 45 + outerRadius * Math.cos(endAngleRad);
    const y2 = 45 + outerRadius * Math.sin(endAngleRad);

    const x3 = 45 + innerRadius * Math.cos(endAngleRad);
    const y3 = 45 + innerRadius * Math.sin(endAngleRad);
    const x4 = 45 + innerRadius * Math.cos(startAngleRad);
    const y4 = 45 + innerRadius * Math.sin(startAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  };

  return (
    <div className="analysis-result-layout">
      <div
        className={`analysis-result ${
          visibleElements.resultSection ? "scale-in" : "scale-out"
        }`}
      >
        <div className="result-header">
          <h1>{analysisData.total_reviews}개의 리뷰 AI 분석 결과입니다.</h1>
        </div>
        <div className="analysis-info">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-info">
            <h3>{product.brand}</h3>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button
              className="buy-btn"
              onClick={() => {
                if (product.url) {
                  window.open(product.url, "_blank");
                } else {
                  alert("상품 구매 링크가 없습니다.");
                }
              }}
            >
              <span className="btn-text">구매하기</span>
            </button>
          </div>
        </div>
      </div>
      <div className="analysis-result-container">
        <div
          className={`analysis-top ${
            visibleElements.topMidSection ? "fade-in-up" : "fade-out"
          }`}
        >
          <h2>어떤 점이 좋았고, 아쉬웠을까요?</h2>
          <div className="chart-container">
            <div className="chart">
              <svg width="90" height="90" viewBox="0 0 90 90">
                <g>
                  <path
                    d={createDonutPath(prosPercent, -90)}
                    fill="#5383e8"
                    className="chart-segment pros"
                  />
                  <path
                    d={createDonutPath(neutralPercent, -90 + prosPercent * 3.6)}
                    fill="#00bba3"
                    className="chart-segment neutral"
                  />
                  <path
                    d={createDonutPath(
                      consPercent,
                      -90 + prosPercent * 3.6 + neutralPercent * 3.6
                    )}
                    fill="#f44336"
                    className="chart-segment cons"
                  />
                </g>
                <text
                  x="45"
                  y="45"
                  textAnchor="middle"
                  className="chart-total-text"
                >
                  총 {analysisData.total_reviews}개
                </text>
                <text
                  x="45"
                  y="58"
                  textAnchor="middle"
                  className="chart-review-text"
                >
                  리뷰
                </text>
              </svg>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color pros-color"></div>
                  <span>긍정적 리뷰 {Math.round(prosPercent)}%</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color neutral-color"></div>
                  <span>중립적 리뷰 {Math.round(neutralPercent)}%</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color cons-color"></div>
                  <span>부정적 리뷰 {Math.round(consPercent)}%</span>
                </div>
              </div>
            </div>
            <div className="summary-content">
              <h3>[ 전반적인 평가 ]</h3>
              <p>{analysisData.summary}</p>
            </div>
          </div>
        </div>
        <div
          className={`analysis-mid ${
            visibleElements.topMidSection ? "fade-in-up" : "fade-out"
          }`}
        >
          <div className="pros-cons-section">
            <div className="pros-section">
              <ul>
                {analysisData.pros.map((pro, index) => (
                  <li
                    key={`pro-${index}`}
                    className="content-box"
                    style={{
                      backgroundColor: `rgba(40, 52, 78, ${1 - index * 0.15})`,
                    }}
                  >
                    {index + 1}. {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cons-section">
              <ul>
                {analysisData.cons.length > 0 ? (
                  analysisData.cons.map((con, index) => (
                    <li
                      key={`con-${index}`}
                      className="content-box"
                      style={{
                        backgroundColor: `rgba(89, 52, 59, ${
                          1 - index * 0.15
                        })`,
                      }}
                    >
                      {index + 1}. {con}
                    </li>
                  ))
                ) : (
                  <li>특별한 단점이 언급되지 않았습니다.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`analysis-bottom ${
            visibleElements.bottomSection1 ? "fade-in-up" : "fade-out"
          }`}
        >
          <h2>구매자들이 느낀 사이즈 체감입니다.</h2>
          <div className="recommendation-content">
            <p>{analysisData.size}</p>
          </div>
        </div>
        <div
          className={`analysis-bottom ${
            visibleElements.bottomSection2 ? "fade-in-up" : "fade-out"
          }`}
        >
          <h2>이런 분이라면 만족하실 거예요!</h2>
          <div className="recommendation-content">
            <p>{analysisData.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;

import React from "react";
import "./HowToUse.scss";

function HowToUse() {
  const steps = [
    {
      number: 1,
      image: "/step1.png",
      alt: "플랫폼 선택",
      description:
        "MITGOSA 지원 플랫폼 중에서 현재 사용중인 플랫폼을 선택합니다.",
    },
    {
      number: 2,
      image: "/step2.png",
      alt: "URL 입력",
      description:
        "플랫폼 상품 페이지 URL을 복사하여 MITGOSA 검색창에 붙여넣습니다.",
    },
    {
      number: 3,
      image: "/step3.png",
      alt: "AI 분석",
      description:
        "버튼을 누르면 AI가 리뷰를 분석합니다. 리뷰 수에 따라 시간이 달라질 수 있습니다.",
    },
    {
      number: 4,
      image: "/step4.png",
      alt: "결과 확인",
      description:
        "구매자의 전반적인 평가와 장단점을 한눈에 정리하여 보여줍니다.",
    },
  ];

  return (
    <section className="how-to-use-section">
      <div className="how-to-use-title">How to use</div>
      <div className="how-to-use-grid">
        {steps.map((step) => (
          <div key={step.number} className="how-to-use-grid-item">
            {step.number}
            <div className="how-to-use-grid-item-content">
              <img
                src={step.image}
                alt={step.alt}
                className="how-to-use-image"
              />
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowToUse;

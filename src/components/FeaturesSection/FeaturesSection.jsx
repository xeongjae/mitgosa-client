import React from "react";
import "./FeaturesSection.scss";

function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features">
        <div className="feature-item1">
          <div className="feature-item1-title">지원 플랫폼</div>
          <ol className="feature-item1-content">
            <li
              className="feature-item1-content-item border"
              onClick={() => window.open("https://www.musinsa.com/main/musinsa/ranking?gf=M&storeCode=musinsa&sectionId=200&contentsId=&categoryCode=000&ageBand=AGE_BAND_ALL", "_blank")}
            >
              <p>-</p>
              <img src="/musinsa.png" alt="무신사" className="shop-icon" />
              <div>
                <p className="platform-name">MUSINSA</p>
                <p className="shop-description">
                  패션의 모든 것, 다 무신사랑 해!
                  <br />
                  무신사에서 다양한 혜택과 스타일 팁을 확인해보세요.
                </p>
              </div>
            </li>
            <li className="feature-item1-content-item border not-supported">
              <p>-</p>
              <img src="/29cm.png" alt="29cm" className="shop-icon" />
              <div>
                <p className="platform-name">29CM</p>
                <p className="shop-description">
                  패션, 라이프스타일, 컬처까지 <br />
                  29CM만의 감도 깊은 셀렉션을 만나보세요.
                </p>
              </div>
            </li>
            <li className="feature-item1-content-item border not-supported">
              <p>-</p>
              <img src="/ably.png" alt="에이블리" className="shop-icon" />
              <div>
                <p className="platform-name">ABLY</p>
                <p className="shop-description">
                  에이블리는 365일 딱 하나만 사도 무료배송! <br />
                  패션, 뷰티, 라이프 스타일의 모든 것을 쇼핑하세요.
                </p>
              </div>
            </li>
            <li className="feature-item1-content-item border not-supported">
              <p>-</p>
              <img src="/zigzag.png" alt="지그재그" className="shop-icon" />
              <div>
                <p className="platform-name">ZIGZAG</p>
                <p className="shop-description">
                  4000만 여성이 선택한 올인원 쇼핑 앱 <br />
                  지그재그에서 제가 알아서 살게요.
                </p>
              </div>
            </li>
            <li className="feature-item1-content-item not-supported">
              <p>-</p>
              <img src="/wconcept.png" alt="W컨샙" className="shop-icon" />
              <div>
                <p className="platform-name">Wconcept</p>
                <p className="shop-description">
                  나만의 컨셉, 감각적 스타일링 <br />
                  감도 높은 콘텐츠와 큐레이션으로 나만의 스타일을 발견해보세요.
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div className="tool-section">
          <div className="feature-item1-title">응답 API</div>
          <img src="/modified_tttest.png" alt="logo" className="tool-image" />
          <h3>Gemini API</h3>
          <p className="api-subtitle">Google Gemini 2.0 Flash</p>

          <div className="api-links">
            <a
              href="https://ai.google.dev/gemini-api/docs?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
              className="api-link documentation"
            >
              Documentation
            </a>
            <a
              href="https://aistudio.google.com/app/apikey?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
              className="api-link key"
            >
              Get an API Key
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
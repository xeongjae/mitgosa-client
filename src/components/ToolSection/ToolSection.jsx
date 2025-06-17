import React from "react";
import "./ToolSection.scss";

function ToolSection() {
  return (
    <section className="feature-item2">
      <div className="item2-title">How to use</div>
      <div className="item2-flex">
        <div className="item2-grid-item item2-border">
          1
          <div className="item2-grid-item-content">
            <img src="/img1.png" alt="one" className="item2-image" />
            <p>
              MITGOSA 지원 플랫폼 중에서 <br />
              현재 사용중인 플랫폼을 선택합니다.
            </p>
          </div>
        </div>
        <div className="item2-grid-item item2-border">
          2
          <div className="item2-grid-item-content">
            <img src="/img2.png" alt="one" className="item2-image" />
            <p>
              플랫폼 상품 페이지 URL을 복사하여 <br />
              MITGOSA 검색창에 붙여넣습니다.
            </p>
          </div>
        </div>
        <div className="item2-grid-item item2-border">
          3
          <div className="item2-grid-item-content">
            <img src="/img333.png" alt="one" className="item2-image" />
            <p>
              버튼을 누르면 AI가 리뷰를 분석합니다.
              <br />
              리뷰 수에 따라 시간이 달라질 수 있습니다.
            </p>
          </div>
        </div>
        <div className="item2-grid-item">
          4
          <div className="item2-grid-item-content">
            <img src="/img4.png" alt="one" className="item2-image" />
            <p>
              구매자의 전반적인 평가와 장단점을 <br />
              한눈에 정리하여 보여줍니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolSection;

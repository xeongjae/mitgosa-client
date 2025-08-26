import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultHeader from "../components/ResultHeader/ResultHeader";
import Footer from "../components/Footer/Footer";
import AnalysisResult from "../components/AnalysisResult/AnalysisResult";
import "./ResultPage.scss";

const ResultPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL state에서 데이터 가져오기
    if (location.state?.analysisData) {
      setResult(location.state.analysisData);
      setLoading(false);
    } else {
      // state가 없으면 메인 페이지로 리다이렉트
      navigate("/");
    }
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="summary-container">
        <div className="header-layout-container">
          <div className="layout-container">
            <ResultHeader />
          </div>
        </div>

        <div className="loading-container">
          <div className="loading-section">
            <h1>AI가 리뷰를 분석 중입니다...</h1>
            <div className="loading-spinner"></div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="summary-container">
      <div className="result-header-layout-container">
        <ResultHeader />
      </div>
      <div className="summary-content">
        <AnalysisResult result={result} />
      </div>

      <div className="footer-layout-container">
        <Footer />
      </div>
    </div>
  );
};

export default ResultPage;

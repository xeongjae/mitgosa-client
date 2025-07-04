# MITGOSA - AI 리뷰 요약 서비스

<p align="center">
<img src="public/믿고사로고.png" alt="로고" width="500"/>
</p>

<p align="center">
  <strong>
  MITGOSA는 수많은 리뷰를 보며 많은 시간을 보내는 사람들을 위해, <br>원하는 상품의 전체 리뷰를 AI가 분석하여 한눈에 요약해주는 서비스입니다.
  </strong>
<br>
<a href="https://mitgosa.vercel.app">
    방문하기
</a>

## 🗂 목차

<!-- toc -->

- [💭 프로젝트 동기](#%F0%9F%92%AD-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%8F%99%EA%B8%B0)
- [🛠 사용 기술](#%F0%9F%9B%A0-%EC%82%AC%EC%9A%A9-%EA%B8%B0%EC%88%A0)
- [🎞 구현 기능 미리보기](#%F0%9F%8E%9E-%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0)
- [📝 구현 세부사항](#%F0%9F%93%9D-%EA%B5%AC%ED%98%84-%EC%84%B8%EB%B6%80%EC%82%AC%ED%95%AD)
  * [크롤링을 사용한 필수 데이터 확보](#%ED%81%AC%EB%A1%A4%EB%A7%81%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C-%ED%95%84%EC%88%98-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%99%95%EB%B3%B4)
    + [1. 네이버 API의 제한사항 : Puppeteer를 사용한 해결](#1-%EB%84%A4%EC%9D%B4%EB%B2%84-api%EC%9D%98-%EC%A0%9C%ED%95%9C%EC%82%AC%ED%95%AD--puppeteer%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%ED%95%B4%EA%B2%B0)
    + [2. 동영상 데이터를 크롤링하는 방법](#2-%EB%8F%99%EC%98%81%EC%83%81-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
  * [Zustand를 사용한 API 요청 과 응답 데이터의 관리](#zustand%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-api-%EC%9A%94%EC%B2%AD-%EA%B3%BC-%EC%9D%91%EB%8B%B5-%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%9D%98-%EA%B4%80%EB%A6%AC)
    + [1. 길어지는 메인페이지의 코드 : 컴포넌트의 관심사 분리](#1-%EA%B8%B8%EC%96%B4%EC%A7%80%EB%8A%94-%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80%EC%9D%98-%EC%BD%94%EB%93%9C--%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%EA%B4%80%EC%8B%AC%EC%82%AC-%EB%B6%84%EB%A6%AC)
    + [2. 전역 상태관리를 통한 에러처리 : 자동화 및 사용자 상호작용](#2-%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%EB%A5%BC-%ED%86%B5%ED%95%9C-%EC%97%90%EB%9F%AC%EC%B2%98%EB%A6%AC--%EC%9E%90%EB%8F%99%ED%99%94-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%83%81%ED%98%B8%EC%9E%91%EC%9A%A9)
  * [검색에 사용되는 영어 ➡ 한글 자동 변환 기능 만들기](#%EA%B2%80%EC%83%89%EC%97%90-%EC%82%AC%EC%9A%A9%EB%90%98%EB%8A%94-%EC%98%81%EC%96%B4-%E2%9E%A1-%ED%95%9C%EA%B8%80-%EC%9E%90%EB%8F%99-%EB%B3%80%ED%99%98-%EA%B8%B0%EB%8A%A5-%EB%A7%8C%EB%93%A4%EA%B8%B0)
    + [1. 변환을 위한 한글 파고 들기 : 초성, 중성, 종성](#1-%EB%B3%80%ED%99%98%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%95%9C%EA%B8%80-%ED%8C%8C%EA%B3%A0-%EB%93%A4%EA%B8%B0--%EC%B4%88%EC%84%B1-%EC%A4%91%EC%84%B1-%EC%A2%85%EC%84%B1)
    + [2. 패턴을 활용한 변환 알고리즘 구현](#2-%ED%8C%A8%ED%84%B4%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%B3%80%ED%99%98-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84)
  * [프로그레스바를 활용한 직관적 애니메이션 구현](#%ED%94%84%EB%A1%9C%EA%B7%B8%EB%A0%88%EC%8A%A4%EB%B0%94%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%A7%81%EA%B4%80%EC%A0%81-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84)
    + [1. 초기 UI 구성 : 동영상의 총 개수 활용](#1-%EC%B4%88%EA%B8%B0-ui-%EA%B5%AC%EC%84%B1--%EB%8F%99%EC%98%81%EC%83%81%EC%9D%98-%EC%B4%9D-%EA%B0%9C%EC%88%98-%ED%99%9C%EC%9A%A9)
    + [2. 진행률 표현 : 차오르는 애니메이션 구현](#2-%EC%A7%84%ED%96%89%EB%A5%A0-%ED%91%9C%ED%98%84--%EC%B0%A8%EC%98%A4%EB%A5%B4%EB%8A%94-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84)
- [프로젝트 후기](#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9B%84%EA%B8%B0)

<!-- tocstop -->

<br />


## 💭 프로젝트 동기

이 프로젝트는 **인터넷 쇼핑을 좀 더 빠르고 편리하게** 돕고자 하는 생각에서 출발하였습니다.

온라인 마켓을 통해 쇼핑하며, 신뢰할 수 있는 정보를 얻기 위해 **수많은 리뷰를 하나하나 읽는 과정의 불편함**을 느꼈습니다. 저와 같은 사람들을 위해, 크롤링(crawling)하여 얻은 전체 리뷰를 **AI가 요약하고 정리**해줌으로써 사용자의 **시간과 노력을 획기적으로 절약**할 수 있을 것이라는 확신을 가지고 이 프로젝트를 시작하게 되었습니다.

저의 필요에서 비롯된 아이디어이기에 더 큰 애정을 가지고 개발에 임했으며, 그 속에 **기술적 도전을** 하나하나 달성하며 흥미를 느낄 수 있었습니다.

<br>

## ⚙️ 구현 기능 및 아키텍처

- **🌐 웹 크롤링:** `Puppeteer`를 사용하여 동적으로 렌더링되는 쇼핑몰의 리뷰 데이터를 안정적으로 수집합니다.
- **🤖 AI 리뷰 분석:** `Google Gemini API`를 활용하여 수집된 수백, 수천 개의 리뷰 텍스트를 분석하고 핵심적인 장점과 단점을 추출합니다.
- **📊 분석 결과 시각화:** 분석된 결과를 바탕으로 상품의 장점, 단점, 종합 평점, 추천 대상까지 한눈에 보기 쉽게 제공합니다.

<img src="public/architecture.png" alt="아키텍처" width="1000"/>

1.  **Client:** 사용자가 상품 URL을 입력하면, 이를 서버로 전송합니다.
2.  **Server:** 전달받은 URL을 `Puppeteer`를 이용해 크롤링하여 리뷰 데이터를 수집합니다.
3.  **Server:** 수집된 리뷰 데이터를 `Google Gemini API`로 보내 분석을 요청합니다.
4.  **Server:** 분석된 결과(장점, 단점, 요약 등)를 클라이언트로 전달합니다.
5.  **Client:** 서버로부터 받은 데이터를 사용자에게 시각적으로 명확하게 보여줍니다.

<br>

## 🛠️ 사용 기술

| 구분              | 기술                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**      | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> |
| **Backend**       | <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">                                                                                                                                                                                               |
| **Crawling & AI** | <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white"> <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white">                                                                                                                                                                                      |
| **Deployment**    | <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white">                                                                                                                                                                                                   |

<br>

## 💡 프로젝트를 통해 얻은 경험

- **비동기 처리와 에러 핸들링:** 크롤링과 외부 API 통신 과정에서 발생하는 다양한 비동기 작업을 효과적으로 제어하고, 예외 상황에 대한 안정적인 에러 처리 로직을 구축하며 Node.js의 비동기 처리 모델에 대한 깊은 이해를 얻을 수 있었습니다.
- **동적 웹 크롤링의 이해:** SPA(Single Page Application)로 구성된 최신 웹사이트의 구조를 분석하고, `Puppeteer`를 통해 JavaScript가 렌더링된 후의 최종 DOM에 접근하여 원하는 데이터를 정확히 수집하는 기술적 역량을 길렀습니다.
- **LLM(거대 언어 모델) 활용 능력:** `Gemini`와 같은 강력한 AI 모델을 활용하여 비정형 텍스트 데이터를 정제하고, 의미 있는 정보(장점, 단점, 요약)를 추출하는 방법을 학습했습니다. 단순히 API를 호출하는 것을 넘어, 원하는 결과물을 얻기 위한 효과적인 프롬프트 엔지니어링의 중요성을 깨달았습니다.

<br>

---


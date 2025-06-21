# MITGOSA - AI 리뷰 요약 서비스

![mitgosa-high-resolution-logo-transparent](https://github.com/user-attachments/assets/e0a2948c-d698-422f-b44c-c040d7c570b6)

**MITGOSA는 하나의 상품을 고를 때에도 수많은 리뷰를 비교하고 고민하며 많은 시간을 보내는 사람들을 위해, 원하는 상품의 전체 리뷰를 추출하고 AI가 해당 상품의 장단점을 한눈에 정리해주는 서비스입니다.**

<br>

## 💭 프로젝트 동기

이 프로젝트는 **인터넷 쇼핑을 좀 더 빠르고 편리하게** 돕고자 하는 생각에서 출발하였습니다.

옷, 신발, 가전제품 등 다양한 상품을 온라인 마켓을 통해 쇼핑하며, 신뢰할 수 있는 정보를 얻기 위해 **수많은 리뷰를 하나하나 읽는 과정의 불편함**을 느꼈습니다. 저와 같은 사람들을 위해, 크롤링(crawling)하여 얻은 전체 리뷰를 **AI가 요약하고 정리**해줌으로써 사용자의 **시간과 노력을 획기적으로 절약**할 수 있을 것이라는 확신을 가지고 이 프로젝트를 시작하게 되었습니다.

저의 필요에서 비롯된 아이디어이기에 더 큰 애정을 가지고 개발에 임했으며, 그 속에 **흥미로운 기술적 도전 과제**가 많다고 느껴졌습니다.


<br>


## ⚙️ 주요 기능 및 아키텍처

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

## 🛠️ 기술 스택

| 구분              | 기술                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**      | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> |
| **Backend**       | <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">                                                                                                                                                                                               |
| **Crawling & AI** | <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white"> <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white">                                                                                                                                                                                      |
| **Deployment**    | (배포 예정 플랫폼)                                                                                                                                                                                                                                                                                                                                                                                              |

<br>

## 💡 프로젝트를 통해 얻은 경험

- **비동기 처리와 에러 핸들링:** 크롤링과 외부 API 통신 과정에서 발생하는 다양한 비동기 작업을 효과적으로 제어하고, 예외 상황에 대한 안정적인 에러 처리 로직을 구축하며 Node.js의 비동기 처리 모델에 대한 깊은 이해를 얻을 수 있었습니다.
- **동적 웹 크롤링의 이해:** SPA(Single Page Application)로 구성된 최신 웹사이트의 구조를 분석하고, `Puppeteer`를 통해 JavaScript가 렌더링된 후의 최종 DOM에 접근하여 원하는 데이터를 정확히 수집하는 기술적 역량을 길렀습니다.
- **LLM(거대 언어 모델) 활용 능력:** `Gemini`와 같은 강력한 AI 모델을 활용하여 비정형 텍스트 데이터를 정제하고, 의미 있는 정보(장점, 단점, 요약)를 추출하는 방법을 학습했습니다. 단순히 API를 호출하는 것을 넘어, 원하는 결과물을 얻기 위한 효과적인 프롬프트 엔지니어링의 중요성을 깨달았습니다.

<br>

---

MIT License © 2024, [Your Name]

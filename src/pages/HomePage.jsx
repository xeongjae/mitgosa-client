import "./HomePage.scss";

import Header from "../components/Header/Header";
import ReviewAnalyzer from "../components/ReviewAnalyzer/ReviewAnalyzer";
import HowToUse from "../components/HowToUse/HowToUse";
import Showcase from "../components/Showcase/Showcase";
import Dashboard from "../components/Dashboard/Dashboard";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <main className="home-page">
      <Header />
      <ReviewAnalyzer />
      <HowToUse />
      <Showcase />
      <Dashboard />
      <Footer />
    </main>
  );
};

export default HomePage;

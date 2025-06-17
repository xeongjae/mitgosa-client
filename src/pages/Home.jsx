import "./Home.scss";

import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import ToolSection from "../components/ToolSection/ToolSection";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <div className="header-layout-container">
        <Header />
      </div>
      <HeroSection />
      <ToolSection />
      <div className="layout-container">
        <FeaturesSection />
      </div>
      <div className="footer-layout-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

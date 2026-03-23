import "./Home.scss";

import Header from "../components/common/Header/Header";
import HeroSection from "../components/home/HeroSection/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection/FeaturesSection";
import ToolSection from "../components/home/ToolSection/ToolSection";
import Footer from "../components/common/Footer/Footer";

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

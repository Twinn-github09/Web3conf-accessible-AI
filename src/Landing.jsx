import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './components/landingui/Heresection';
import AboutSection from './components/landingui/about';
import App from './App';
import './index.css'


const LandingPage = () => {
  
  return (
    <div>
      <HeroSection  />
      <AboutSection />
    </div>
  );
};

export default LandingPage;

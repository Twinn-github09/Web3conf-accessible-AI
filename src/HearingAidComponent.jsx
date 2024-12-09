import React, { useState } from 'react';
import { ThirdwebProvider, ConnectWallet } from "@thirdweb-dev/react";
import Navbar from './components/Navbar';
import HumanFaceOutline from './components/HumanFaceOutline';
import HearingAid from './components/HearingAid';
import DonationModal from './components/DonationModal';
import SuccessMessage from './components/SuccessMessage';

import './additional-style.css'
function HearingAidComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonationSuccessful, setIsDonationSuccessful] = useState(false);

  const handleDonateClick = () => {
    setIsModalOpen(true);
  };

  const handleDonationComplete = () => {
    setIsModalOpen(false);
    setIsDonationSuccessful(true);
    setTimeout(() => setIsDonationSuccessful(false), 3000);
  };

  return (
    <ThirdwebProvider activeChain="ethereum">
      <div className="min-h-screen bg-gray-100 relative overflow-hidden">
        <Navbar />
        <HumanFaceOutline />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <ConnectWallet />
          
          <button 
            onClick={handleDonateClick}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
          >
            Donate Now
          </button>
        </div>

        <HearingAid donated={isDonationSuccessful} />
        
        {isModalOpen && (
          <DonationModal 
            onClose={() => setIsModalOpen(false)}
            onDonationComplete={handleDonationComplete}
          />
        )}

        {isDonationSuccessful && <SuccessMessage />}
      </div>
    </ThirdwebProvider>
  );
}

export default HearingAidComponent;
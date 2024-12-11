import React from "react";
import { useNavigate } from "react-router-dom";
import Globe from "@/components/ui/globe";

import '../../index.css'
const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartNowClick = () => {
    navigate("/app"); // Navigate to the "/app" route
  };
  const handleconNowClick = () => {
    navigate("/con"); // Navigate to the "/app" route
  };
  const handleDonateNowClick = () => {
  /**
   * Handles the "Donate Now" button click by opening a new window with your web3 transaction URL.
   *
   * NOTE: Replace "https://your-web3-transaction-url.com" with your actual web3 transaction URL.
   */
    window.open("https://pages.razorpay.com/pl_Lyzqamu0yPSbLy/view", "_blank");
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-r from-blue-500 to-purple-700 text-white text-center overflow-hidden">
      <div className="absolute top-1/5 transform -translate-x-1/2 -translate-y-1/2 z-0" style={{ left: "28%" }}>
        <Globe className="w-96 h-96 md:w-[60rem] md:h-[40rem] opacity-50" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl text-white md:text-6xl font-bold mb-4">Breaking Barriers with Sign Language!</h1>
        <p className="text-xl text-black md:text-2xl mb-8">A Revolutionary Way to Bridge Communication Gaps</p>

        <div className="flex gap-4">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black"
            onClick={handleStartNowClick}
          >
            Start Now
          </button>

          <button
            className="bg-pink-500 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-pink-500"
            onClick={handleDonateNowClick}
          >
            Donate Now
          </button>

          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-blue-500"
            onClick={handleconNowClick}
          >
            Contribute
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),rgba(0,0,0,0))]" />
    </div>
  );
};

export default HeroSection;

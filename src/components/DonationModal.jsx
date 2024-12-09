import React, { useState } from 'react';
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from 'ethers';

const DonationModal = ({ onClose, onDonationComplete }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const { contract } = useContract("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const { mutateAsync: donate } = useContractWrite(contract, "donate");

  const handleDonate = async () => {
    try {
      const amountInWei = ethers.utils.parseEther(donationAmount);
      
      if (amountInWei.lte(0)) {
        alert('Please enter a valid donation amount');
        return;
      }

      await donate([{ value: amountInWei }]);
      onDonationComplete();
    } catch (error) {
      console.error("Donation failed", error);
      alert('Donation failed. Please try again.');
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (value.split('.').length - 1 > 1) return;
    setDonationAmount(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl mb-4 text-center font-semibold">Make a Donation</h2>
        <div className="mb-4">
          <label 
            htmlFor="donation-amount" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Donation Amount (ETH)
          </label>
          <input 
            id="donation-amount"
            type="text" 
            value={donationAmount}
            onChange={handleAmountChange}
            placeholder="Enter amount in ETH"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum donation: 0.001 ETH
          </p>
        </div>
        <div className="flex justify-between space-x-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleDonate}
            disabled={!donationAmount}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;

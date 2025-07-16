import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const CheckDonation = () => {
  const [campaignId, setCampaignId] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [amount, setAmount] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("MetaMask required");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const donation = await contract.getDonation(campaignId, donorAddress);
      setAmount(ethers.formatEther(donation));
      setCampaignId("");
      setDonorAddress("");
    } catch (error) {
      alert(error.reason || "Failed to fetch donation");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Check Donation</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <input
          name="campaignId"
          type="number"
          placeholder="Campaign ID"
          required
          className="input"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        />
        <input
          name="donorAddress"
          type="text"
          placeholder="Donor Address"
          required
          className="input"
          value={donorAddress}
          onChange={(e) => setDonorAddress(e.target.value)}
        />
        <button type="submit" className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 col-span-2">
          Get Donation
        </button>
      </form>
      {amount !== null && (
        <p className="mt-4 text-green-600 font-semibold">Donated Amount: {amount} ETH</p>
      )}
    </div>
  );
};

export default CheckDonation;

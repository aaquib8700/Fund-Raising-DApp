import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const ClaimRefund = () => {
  const [campaignId, setCampaignId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("MetaMask required");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.claimRefund(campaignId);
      await tx.wait();
      alert("Refund claimed successfully!");
      setCampaignId("");
    } catch (error) {
      alert(error.reason || "Claim refund failed");
      setCampaignId("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Claim Refund</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <input
          name="campaignId"
          type="number"
          placeholder="Campaign ID"
          required
          className="input col-span-2"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        />
        <button type="submit" className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 col-span-2">
          Claim Refund
        </button>
      </form>
    </div>
  );
};

export default ClaimRefund;

import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const MarkFailed = () => {
  const [campaignId, setCampaignId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("MetaMask required");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.markFailed(campaignId);
      await tx.wait();
      alert("Campaign marked as failed.");
      setCampaignId("");
    } catch (error) {
      alert(error.reason || "Mark failed failed");
      setCampaignId("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Mark Campaign Failed</h2>
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
          Mark as Failed
        </button>
      </form>
    </div>
  );
};

export default MarkFailed;

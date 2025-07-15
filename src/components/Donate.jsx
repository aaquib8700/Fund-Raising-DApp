// src/components/Donate.jsx
import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const Donate = () => {
  const [form, setForm] = useState({ campaignId: "", amount: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("MetaMask is required");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const campaignId = parseInt(form.campaignId);
      const amount = ethers.parseEther(form.amount);

      const tx = await contract.donate(campaignId, amount, { value: amount });
      await tx.wait();
      alert("Donation successful!");
      setForm({ campaignId: "", amount: "" });
    } catch (error) {
      alert(error.reason || "Donation failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Donate</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <input name="campaignId" type="number" placeholder="Campaign ID" required className="input" value={form.campaignId} onChange={handleChange} />
        <input name="amount" type="number" step="0.001" placeholder="Amount" required className="input" value={form.amount} onChange={handleChange} />
        <button type="submit" className="bg-green-400 text-white mt-5 py-2 px-4 rounded hover:bg-green-500 col-span-2">
          Donate
        </button>
      </form>
    </div>
  );
};

export default Donate;

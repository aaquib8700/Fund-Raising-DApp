import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const tokenTypes = ["ETH", "USDT", "BUSD", "TUSD"];

const CreateCampaign = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    targetAmount: "",
    minimumDonation: "",
    duration: "",
    tokenAddress: "",
    tokenType: "0",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install MetaMask");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.createCampaign(
        form.title,
        form.description,
        ethers.parseEther(form.targetAmount),
        ethers.parseEther(form.minimumDonation),
        form.duration,
        form.tokenAddress,
        form.tokenType
      );
      await tx.wait();
      alert("Campaign created successfully!");
      setForm({
        title: "",
        description: "",
        targetAmount: "",
        minimumDonation: "",
        duration: "",
        tokenAddress: "",
        tokenType: "0",
      });
    } catch (error) {
      alert(error.reason || "Transaction Failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Create Campaign</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <input name="title" type="text" placeholder="Title" required className="input" value={form.title} onChange={handleChange} />
        <input name="description" type="text" placeholder="Description" required className="input" value={form.description} onChange={handleChange} />
        <input name="targetAmount" type="number" step="0.001" placeholder="Target Amount (in ETH)" required className="input" value={form.targetAmount} onChange={handleChange} />
        <input name="minimumDonation" type="number" step="0.001" placeholder="Minimum Donation (in ETH)" required className="input" value={form.minimumDonation} onChange={handleChange} />
        <input name="duration" type="number" placeholder="Duration (in seconds)" required className="input" value={form.duration} onChange={handleChange} />
        <input name="tokenAddress" type="text" placeholder="Token Address (0x0 for ETH)" required className="input" value={form.tokenAddress} onChange={handleChange} />
        <select name="tokenType" className="input col-span-2 md:col-span-1" value={form.tokenType} onChange={handleChange}>
          {tokenTypes.map((type, index) => (
            <option key={index} value={index}>{type}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 col-span-2">
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const count = await contract.campaignCount();
      setCampaignCount(Number(count));

      const fetched = [];
      for (let i = 0; i < count; i++) {
        try {
          const c = await contract.getCampaign(i);
          fetched.push({
            id: i,
            creator: c[0],
            title: c[1],
            description: c[2],
            target: ethers.formatEther(c[3]),
            minimum: ethers.formatEther(c[4]),
            deadline: new Date(Number(c[5]) * 1000).toLocaleString(),
            tokenType: Number(c[7]),
            totalDonated: ethers.formatEther(c[8]),
            withdrawn: c[9],
            failed: c[10],
          });

        } catch (err) {
          console.error("Error fetching campaign", i, err);
        }
      }
      setCampaigns(fetched);
    };

    fetchCampaigns();
    

  }, []);

  const tokenTypeLabel = ["ETH", "USDT", "BUSD", "TUSD"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Created Campaigns</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{campaigns.length === 0 ? (
  <p className="text-center text-gray-500">No campaigns found.</p>
) : (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-80">
    {campaigns.map((c) => (
<div key={c.id} className="min-w-[280px] max-w-[400px] w-full border p-4 rounded shadow-sm break-words">
  <h3 className="text-2xl font-bold text-green-600 mb-2">{c.title}</h3>
  <p className="text-gray-700 mb-3">{c.description}</p>
  <ul className="text-sm text-gray-800 space-y-1">
    <li><strong>ID:</strong> {c.id}</li>
    <li><strong>Target:</strong> {c.target} {tokenTypeLabel[c.tokenType]}</li>
    <li><strong>Min Donation:</strong> {c.minimum} {tokenTypeLabel[c.tokenType]}</li>
    <li><strong>Total Donated:</strong> {c.totalDonated} {tokenTypeLabel[c.tokenType]}</li>
    <li><strong>Deadline:</strong> {c.deadline}</li>
    <li><strong>Creator:</strong> {c.creator}</li>
    <li><strong>Status:</strong> <span className="text-green-500">{c.withdrawn ? "Withdrawn" : c.failed ? "Failed" : "Active"}</span></li>
  </ul>
</div>

    ))}
  </div>
)}

      </div>
    </div>
  );
};

export default CampaignList;

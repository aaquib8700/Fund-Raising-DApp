import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import { WalletContext } from "./context/WalletContext";
import CreateCampaign from "./components/CreateCampaign";
import Donate from "./components/Donate";
import Withdraw from "./components/Withdraw";
import Refund from "./components/Refund";
import MarkFailed from "./components/MarkFailed";
import CheckDonation from "./components/CheckDonation";
import CampaignList from "./components/CampaignList";

const App = () => {
  const { account } = useContext(WalletContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {account ? (
        <>
          <h1 className="text-3xl font-bold text-center mt-6 mb-2 text-gray-800">
            Campaign Management Dashboard
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Create, manage, and interact with crowdfunding campaigns
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
            <CreateCampaign />
            <Donate />
            <Withdraw />
            <MarkFailed />
            <Refund />
            <CheckDonation />
          </div>
          <div className="max-w-6xl mx-auto mt-10 px-4">
            <CampaignList />
          </div>
        </>
      ) : (
        <>
          <Hero />
          <Features />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
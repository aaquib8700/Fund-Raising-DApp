import React, { useContext } from "react";
import { FaRocket } from "react-icons/fa";
import { WalletContext } from "../context/WalletContext";

const Hero = () => {
  const { connectWallet, account } = useContext(WalletContext);

  return (
    <section className="text-center py-24 px-4 bg-gradient-to-b from-[#f1e9ff] to-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
        Decentralized <br />
        <span className="text-green-400">Fund-Raising Platform</span>
      </h1>
      <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
        Launch your project, raise funds, and build the future with our secure, transparent, and
        decentralized crowdfunding platform powered by blockchain technology.
      </p>

      <div className="mt-10 flex justify-center">
        {!account ? (
          <button
            onClick={connectWallet}
            className="flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            <FaRocket />
            Get Started - Connect Wallet
          </button>
        ) : (
          <p className="text-green-600 font-semibold text-lg">
            Connected Account: {account}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;

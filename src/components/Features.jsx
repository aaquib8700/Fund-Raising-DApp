import React from "react";
import { FaDonate, FaCoins, FaHandsHelping } from "react-icons/fa";

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Why Choose Fund-Raising DApp?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-purple-100 p-6 rounded-lg shadow-md">
            <FaDonate className="text-purple-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Easy Donations</h3>
            <p className="text-gray-600">
              Donate with ETH or popular ERC20 tokens instantly, securely, and without hassle.
            </p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
            <FaCoins className="text-yellow-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Transparent Campaigns</h3>
            <p className="text-gray-600">
              Track donations and campaign progress live on-chain for full transparency.
            </p>
          </div>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <FaHandsHelping className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Secure Refunds</h3>
            <p className="text-gray-600">
              Campaigns that don’t meet goals ensure donors can safely claim refunds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

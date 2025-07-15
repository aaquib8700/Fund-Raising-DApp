import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { FaWallet, FaHandHoldingUsd } from "react-icons/fa";

const Navbar = () => {
  const { account, connectWallet } = useContext(WalletContext);

  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-green-400 text-2xl font-bold flex items-center gap-2">
          <FaHandHoldingUsd /> Fund-Raising DApp
        </h1>
        {account ? (
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-400 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <span className="font-semibold">Connected:</span>
              <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
            </div>
            <button
              onClick={connectWallet}
              className="flex items-center gap-2 bg-green-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition"
            >
              <FaWallet /> Switch Account
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="flex items-center gap-2 bg-green-400 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-500 transition"
          >
            <FaWallet /> Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

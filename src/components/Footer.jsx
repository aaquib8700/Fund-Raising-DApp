import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-400 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2025 Fund-Raising DApp. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-200 transition">Privacy</a>
          <a href="#" className="hover:text-gray-200 transition">Terms</a>
          <a href="#" className="hover:text-gray-200 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

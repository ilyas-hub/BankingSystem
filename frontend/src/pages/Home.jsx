import React from "react";

const Home = () => (
  <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
      Welcome to Your Trusted Bank
    </h1>
    <p className="text-lg text-gray-200 max-w-lg text-center">
      Secure, Fast, and Reliable Banking at Your Fingertips. Manage your
      transactions, check balances, and enjoy seamless financial services.
    </p>
    <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-md hover:bg-gray-200 transition">
      Get Started
    </button>
  </div>
);

export default Home;

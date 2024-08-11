import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Welcome to Go Green
      </h1>
      <p className="text-xl text-green-600 mb-8">
        Discover the perfect plants for your home and lifestyle
      </p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </Link>
        <Link
          to="/signin"
          className="bg-white hover:bg-gray-100 text-green-500 font-bold py-2 px-4 rounded border border-green-500"
        >
          Sign In
        </Link>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Indoor", "Outdoor", "Succulents", "Herbs"].map((category) => (
            <div
              key={category}
              className="bg-white p-4 rounded shadow text-center"
            >
              <p className="text-green-600">{category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

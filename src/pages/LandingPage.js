import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://perenual.com/api/species-list?key=sk-Mw5Y66bde38417a996532`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="font-sans">
      <div className="max-h-screen lg:min-h-screen bg-smallland lg:bg-land flex bg-cover pt-16 lg:items-center lg:justify-end">
        <div className="max-w-4xl p-6 lg:mr-16 lg:ml-0 lg:mt-0">
          <h1 className="text-2xl lg:text-4xl font-bold text-green-800 mb-6 text-right lg:text-left">
            <span className="">Welcome to</span> LEAF & BLOOM
          </h1>
          <p className="text-lg lg:text-xl text-green-700 mb-8 text-right lg:text-left">
            At Leaf & Bloom, we believe that every home deserves a touch of
            nature. Whether you're a seasoned plant enthusiast or just beginning
            your green journey, we're here to help you cultivate a space that
            thrives. Let's grow together.
          </p>
          <div className="space-x-4 text-right lg:text-left">
            <Link
              to="/signup"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="bg-white hover:bg-green-100 text-green-500 font-bold py-2 px-4 rounded border border-green-500"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 px-6">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Featured Categories
        </h2>
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.data.map((plant) => (
              <div
                key={plant.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {plant.default_image && (
                  <img
                    src={plant.default_image.thumbnail}
                    alt={plant.common_name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    {plant.common_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Scientific Name:</span>{" "}
                    {plant.scientific_name.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Cycle:</span> {plant.cycle}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Watering:</span>{" "}
                    {plant.watering}
                  </p>
                  {plant.other_name && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Other Names:</span>{" "}
                      {plant.other_name.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;

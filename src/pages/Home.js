import React, { useState } from "react";

const Home = ({ plants, addToCart }) => {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredPlants =
    categoryFilter === "All"
      ? plants
      : plants.filter((plant) => plant.category === categoryFilter);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-green-800 my-6">Our Plants</h1>

      <div className="mb-4">
        <label htmlFor="category" className="mr-2">
          Filter by Category:
        </label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All</option>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Succulents">Succulents</option>
          <option value="Herbs">Herbs</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPlants.map((plant) => (
          <div key={plant.id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{plant.name}</h2>
            <p className="text-gray-600">{plant.category}</p>
            <p className="text-green-600 font-bold">
              ${plant.price.toFixed(2)}
            </p>
            <p className="mt-2">{plant.description}</p>
            <button
              onClick={() => addToCart(plant)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

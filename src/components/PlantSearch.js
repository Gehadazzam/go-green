import React, { useState } from "react";

function PlantSearch({ plants }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search plants..."
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.map((plant) => (
        <div key={plant.id}>{plant.name}</div>
      ))}
    </div>
  );
}

export default PlantSearch;

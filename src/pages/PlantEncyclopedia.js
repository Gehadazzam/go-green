import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterComponent from "../components/FilterComponent";
import PlantList from "../components/PlantList";
import { getPlants, searchPlants } from "../api";

const PlantEncyclopedia = () => {
  const [plants, setPlants] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPlants();
  }, [page, filters]);

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const response = await getPlants(page, filters);
      setPlants(response.data);
      setTotalPages(response.last_page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching plants:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchPlants(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching plants:", error);
      setSearchResults(null);
    }
    setLoading(false);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setSearchResults(null);
  };

  return (
    <div className="mt-7">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <SearchBar onSearch={handleSearch} />
          <FilterComponent onApplyFilters={handleApplyFilters} />
        </div>
        <div className="w-full md:w-2/3">
        {loading ? (
              <p className="text-center mt-4 text-[#3A5A40]">Loading...</p>
            ) : searchResults ? (
              <div>
                <h3 className="text-xl font-semibold text-[#3A5A40] mt-6 mb-4">
                  Search Results
                </h3>
                <PlantList
                  plants={searchResults.data}
                  page={page}
                  setPage={setPage}
                  totalPages={searchResults.last_page}
                  isSearchResult={true}
                />
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-[#3A5A40] mt-6 mb-4">
                  Featured Plants
                </h3>
                <PlantList
                  plants={plants}
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                  isSearchResult={false}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PlantEncyclopedia;
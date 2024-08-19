import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FilterComponent from "../components/FilterComponent";
import PlantList from "../components/PlantList";
import { getPlants, searchPlants } from "../api";

const LandingPage = () => {
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
    <div className="font-sans bg-[#DAD7CD]">
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

      <div className="mt-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#344E41] mb-6">
          Plant Encyclopedia
        </h2>
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
    </div>
  );
};

export default LandingPage;

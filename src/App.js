import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LandingPage from "./pages/LandingPage";
import PlantEncyclopedia from "./pages/PlantEncyclopedia";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Navigation from "./components/Navigation";
import PlantList from "./components/PlantList";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import FilterComponent from "./components/FilterComponent";
import { searchPlants, getPlants } from "./api";
import Footer from "./components/Footer";
import "./App.css";
import Community from "./components/Community";

// Import JSON data
import plantsData from "./data/plants.json";
import usersData from "./data/users.json";
import blogsData from "./data/blogs.json";
import USerProfile from "./pages/UserProfile";
import emailjs from "@emailjs/browser";
emailjs.init(process.env.REACT_APP_PUBLIC_KEY);

function App() {
  const [plants, setPlants] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsers(usersData);
    setBlogs(blogsData);
    fetchInitialPlants();
  }, []);

  const fetchInitialPlants = async () => {
    try {
      const data = await getPlants(1);
      setPlants(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching initial plants:", error);
      setLoading(false);
    }
  };

  const addToCart = (plant) => {
    setCart([...cart, plant]);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchPlants(query);
      setSearchResults(results.data);
    } catch (error) {
      console.error("Error searching plants:", error);
    }
    setLoading(false);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setSearchResults(null);
  };

  return (
    <Provider store={store}>
      <Router>
        <Navigation cartItemCount={cart.length} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/UserProfile" element={<USerProfile />} />
          <Route
            path="/home"
            element={
              <>
                <h1>Plant Encyclopedia</h1>
                <SearchBar onSearch={handleSearch} />
                <FilterComponent onApplyFilters={handleApplyFilters} />
                {loading ? (
                  <p>Loading...</p>
                ) : searchResults ? (
                  <div>
                    <h2>Search Results</h2>
                    <PlantList plants={searchResults} addToCart={addToCart} />
                  </div>
                ) : (
                  <PlantList
                    plants={plants}
                    filters={filters}
                    addToCart={addToCart}
                  />
                )}
                <Home plants={plants} addToCart={addToCart} />
              </>
            }
          />
          <Route path="/plant-encyclopedia" element={<PlantEncyclopedia />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog blogs={blogs} />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductList />} />{" "}
          {/* Route for ProductList */}
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;

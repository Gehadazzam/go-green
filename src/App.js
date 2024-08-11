import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import Navigation from "./components/Navigation";
import PlantSearch from "./components/PlantSearch";

// Import JSON data
import plantsData from "./data/plants.json";
import usersData from "./data/users.json";
import blogsData from "./data/blogs.json";

function App() {
  const [plants, setPlants] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setPlants(plantsData);
    setUsers(usersData);
    setBlogs(blogsData);
  }, []);

  const addToCart = (plant) => {
    setCart([...cart, plant]);
  };

  return (
    <Router>
      <Navigation cartItemCount={cart.length} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/home"
          element={<Home plants={plants} addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cartItems={cart} />} />
        <Route path="/blog" element={<Blog blogs={blogs} />} />
      </Routes>
      <PlantSearch plants={plants} />
    </Router>
  );
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const validate = () => {
    if (!formData.username) {
      setError("Username is required");
      return false;
    }
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email is invalid");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError("");
    return true;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      navigate("/home");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-signBg bg-cover">
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded shadow-md w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2 "
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate("/signIn")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

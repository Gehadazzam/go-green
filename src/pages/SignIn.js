import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sign bg-cover">
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-800">
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signUp")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

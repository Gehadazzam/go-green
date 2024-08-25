import { Link } from "react-router-dom";

const LandingPage = () => {
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
    </div>
  );
};

export default LandingPage;

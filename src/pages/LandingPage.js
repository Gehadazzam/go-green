import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans bg-[#DAD7CD]">
      <div className="max-h-screen lg:min-h-screen bg-smallland lg:bg-land flex bg-cover pt-16 lg:items-center lg:justify-end">
        <motion.div
          className="max-w-4xl p-6 lg:mr-16 lg:ml-0 lg:mt-0"
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        >
          <motion.h1 className="text-2xl lg:text-4xl font-bold text-green-800 mb-6 text-right lg:text-left">
            <span className="">Welcome to</span> LEAF & BLOOM
          </motion.h1>
          <p className="text-lg lg:text-xl text-green-700 mb-8 text-right lg:text-left">
            At Leaf & Bloom, we believe that every home deserves a touch of
            nature. Whether you're a seasoned plant enthusiast or just beginning
            your green journey, we're here to help you cultivate a space that
            thrives. Let's grow together.
          </p>
          <motion.div
            className="space-x-4 text-right lg:text-left transition-opacity duration-100"
            initial={{ opacity: 0, translate: "100%" }}
            whileInView={{ opacity: 1, translate: "0" }}
          >
            <Link
              to="/signup"
              className="bg-tertiary hover:bg-quinary text-white font-bold py-2 px-4 rounded"
              initial={{ opacity: 0, translate: "100%" }}
              whileInView={{ opacity: 1, translate: "0" }}
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="bg-white hover:bg-green-100 text-quinary font-bold py-2 px-4 rounded border border-quinary"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="flex flex-col gap-4 md:gap-0 md:flex-row mx-auto justify-between mt-8 pb-8 md:mt-12 md:pb-12 lg:mt-16 lg:pb-16"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.img
          className="w-11/12 md:w-1/2 lg:w-1/3 mx-auto rounded-xl transition-opacity"
          alt="Decorate Your home with customize plants"
          src={require("../kam-idris-_HqHX3LBN18-unsplash.jpg")}
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        />
        <motion.div
          className="mx-auto my-auto flex flex-col gap-4 px-6 md:px-0"
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        >
          <h2 className="font-bold text-xl">
            Decorate Your home with customize plants
          </h2>
          <p className="">
            Choose from a wide variety of unique plants tailored to your
            personal style and space.
          </p>
          <motion.button
            className="flex items-center w-3/12 lg:w-2/12 justify-center rounded-full transition-colors duration-300 bg-tertiary py-1 hover:bg-quaternary hover:text-white scale-105"
            initial={{ opacity: 0, translate: "100%" }}
            whileInView={{ opacity: 1, translate: "0" }}
            onClick={() => {
              navigate("/products");
            }}
          >
            Shop{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="transition-colors fill-black hover:fill-white duration-300"
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        className="py-4 md:py-8 lg:py-12 flex flex-col gap-4 transition-colors duration-200"
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0" }}
      >
        <h2 className="font-bold text-xl md:text-2xl flex justify-center">
          Featured Catigories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 md-px-8 lg:px-12">
          <div className="relative group">
            <img
              alt="Aromatic Fragrant Plants"
              className="rounded-lg"
              src={require("../annie-spratt-tR2aTsb4qG0-unsplash.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Aromatic Fragrant Plants
            </h3>
          </div>

          <div className="relative group">
            <img
              alt="Insect Repellent Plants"
              className="rounded-lg"
              src={require("../annie-spratt-tR2aTsb4qG0-unsplash.jpg")}
            />{" "}
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Insect Repellent Plants
            </h3>
          </div>
          <div className="relative group">
            <img
              alt="Low Maintenance Plants"
              className="rounded-lg"
              src={require("../annie-spratt-tR2aTsb4qG0-unsplash.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Low Maintenance Plants
            </h3>
          </div>
          <div className="relative group">
            <img
              alt=""
              className="rounded-lg"
              src={require("../annie-spratt-tR2aTsb4qG0-unsplash.jpg")}
            />{" "}
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Air Purifying Plants
            </h3>
          </div>
        </div>
      </motion.div>

      {/* New Blog Section */}
      <motion.div
        className="py-4 md:py-8 lg:py-12 flex flex-col gap-4 transition-colors duration-200"
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0" }}
      >
        <h2 className="font-bold text-xl md:text-2xl flex justify-center">
          Discover the Perfect Plant for Your Space
        </h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 px-4 md:px-8 lg:px-12">
          <p>
            In our blog, we explore the art of selecting the right plants for
            your home or office. From low-light rooms to sun-drenched
            windowsills, choosing the perfect plant for your environment can be
            the difference between a thriving oasis and a wilting plant. Whether
            you’re looking for air-purifying plants for your bedroom or colorful
            blooms to brighten your workspace, our blog offers expert advice,
            seasonal recommendations, and creative ideas to help you make the
            right choice for your unique space.{" "}
            <button onClick={() => navigate("/blog")}>Read More</button>
          </p>
          <div className="relative group">
            <img
              alt="How to Care for Succulents"
              className="rounded-lg"
              src={require("../landsmall.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              How to Care for Succulents
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Share Plants with Review Section */}
      <motion.div
        className="py-4 md:py-8 lg:py-12 flex flex-col gap-4 transition-colors duration-200"
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0" }}
      >
        <h2 className="font-bold text-xl md:text-2xl flex justify-center">
          Share Plants with Review
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 md:px-8 lg:px-12">
          {/* Share Review Cards */}
          <div className="relative group">
            <img
              alt="User's Plant Review"
              className="rounded-lg"
              src={require("../landsmall.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              User's Plant Review
            </h3>
          </div>
          {/* Additional Review Cards */}
        </div>
      </motion.div>

      {/* Plants Care Section */}
      <motion.div
        className="py-4 md:py-8 lg:py-12 flex flex-col gap-4 transition-colors duration-200"
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0" }}
      >
        <h2 className="font-bold text-xl md:text-2xl flex justify-center">
          Plants Care
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 md:px-8 lg:px-12">
          {/* Plant Care Cards */}
          <div className="relative group">
            <img
              alt="Caring for Indoor Plants"
              className="rounded-lg"
              src={require("../landsmall.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Caring for Indoor Plants
            </h3>
          </div>
          {/* Additional Plant Care Cards */}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;

import { useState } from "react";
import { Menu, X } from "lucide-react";
import icon from "../icon.svg";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const [showCart, setShowCart] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-green-600 p-4 fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={icon} alt="Logo" />
          <h1 className="text-white text-xl font-bold font-mono">LEAF BLOOM</h1>
        </div>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative left-0 right-0 top-16 md:top-auto bg-green-500 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6 text-white items-center`}
        >
          {["Home", "About", "Contact", "Blog", "Products"].map((item) => (
            <li key={item} className="flex items-center">
              <a
                className="block no-underline hover:underline"
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              >
                {item}
              </a>
            </li>
          ))}
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
            </svg>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 mx-auto bg-green-50  rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={() => navigate("/signIn")}
                  className="block px-4 py-2 text-sm text-black hover:bg-green-200 w-full text-left"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signUp")}
                  className="block px-4 py-2 text-sm text-black hover:bg-green-200 w-full text-left"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => navigate("/cart")}
              aria-label="View Cart"
              className="text-green-600 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                id="IconChangeColor"
                className="h-16 w-16"
              >
                <rect width="40" height="40" fill="none"></rect>
                <circle cx="80" cy="216" r="12"></circle>
                <circle cx="184" cy="216" r="12"></circle>
                <path
                  d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  id="mainIconPathAttribute"
                ></path>
              </svg>
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

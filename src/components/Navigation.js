import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import icon from "../icon.svg";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlantsMenuOpen, setIsPlantsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const togglePlantsMenu = () => setIsPlantsMenuOpen(prev => !prev);

  return (
    <nav className="bg-green-600 p-4 fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={icon} alt="Logo" />
          <h1 className="text-white text-xl font-bold font-mono">LEAF BLOOM</h1>
        </div>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <ul className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:relative left-0 right-0 top-16 md:top-auto bg-green-500 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6 text-white`}>
          {["Home", "About", "Contact", "Blog"].map(item => (
            <li key={item}>
              <a className="block no-underline hover:underline" href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                {item}
              </a>
            </li>
          ))}
          <li className="relative">
            <button className="flex items-center no-underline hover:underline" onClick={togglePlantsMenu}>
              Plants <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {isPlantsMenuOpen && (
              <ul className="absolute right-0 bg-green-500 p-4 rounded-md">
                <li>
                  <Link to="/plant-encyclopedia" className="block no-underline hover:underline">
                    Plant Encyclopedia
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="block no-underline hover:underline">
                    Products
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
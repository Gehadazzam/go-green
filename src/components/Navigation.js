import { useState } from "react";
import { Menu, X } from "lucide-react";
import icon from "../icon.svg";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className="bg-green-600 p-4 fixed w-full z-10">
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
          {["enclopedia", "About", "Contact", "Blog", "Products"].map(item => (
            <li key={item}>
              <a className="block no-underline hover:underline" href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
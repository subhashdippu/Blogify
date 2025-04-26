import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaSearch,
  FaBlog,
} from "react-icons/fa";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="flex items-center justify-evenly bg-white px-6 py-2 border-b">
      {/* Left */}
      <div className="flex space-x-4">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="text-black hover:text-gray-500" size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-black hover:text-gray-500" size={20} />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="text-black hover:text-gray-500" size={20} />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className="text-black hover:text-gray-500" size={20} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-black hover:text-gray-500" size={20} />
        </a>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-gray-500 hover:text-black cursor-pointer">
          <FaSearch
            className="mr-2"
            size={18}
            onClick={() => setSearchOpen(!searchOpen)}
          />
          <input
            type="text"
            placeholder="Search"
            className={`transition-all duration-300 ease-in-out border-gray-400 focus:outline-none text-gray-700 ${
              searchOpen ? "w-40 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>
        <button className="flex items-center bg-black text-white px-4 py-2 rounded">
          <FaBlog className="mr-2" size={21} />
          Explore blog
        </button>
      </div>
    </div>
  );
};

export default Navbar;

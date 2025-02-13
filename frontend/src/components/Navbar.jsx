import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsAuthenticated(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          MyBank
        </Link>

        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 transition duration-200"
            >
              Home
            </Link>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-gray-800 text-center py-4 space-y-3">
          <li>
            <Link
              to="/"
              className="block text-lg py-2 hover:bg-gray-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="block text-lg py-2 hover:bg-gray-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block text-lg py-2 hover:bg-gray-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-lg py-2 text-red-500 hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

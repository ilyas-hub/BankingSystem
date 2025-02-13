import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignup = async () => {
    if (!form.username || !form.email || !form.password || !form.role) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://bankingsystem-zapd.onrender.com/api/users/signup",
        form,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("userId", res.data.user._id);
      res.data.user.role === "customer"
        ? navigate("/userDashboard")
        : navigate("/banker");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-4">
          Create an Account
        </h1>
        <p className="text-gray-500 text-center mb-6">Sign up to get started</p>

        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Role</option>
          <option value="banker">Banker</option>
          <option value="customer">Customer</option>
        </select>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSignup}
          className={`w-full p-3 rounded-lg font-semibold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

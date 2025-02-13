import { useState } from "react";
import axios from "axios";

const CreateAccount = ({ userId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleCreateAccount = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        `http://localhost:5000/api/accounts/create`,
        { userId }
      );

      setMessage(response.data.message || "Account created successfully!");
      setIsError(false);
      onSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || "Account creation failed.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg max-w-md mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Create New Account
      </h2>

      <button
        onClick={handleCreateAccount}
        className={`mt-4 w-full py-3 rounded-lg text-white font-medium transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? (
          <span className="flex justify-center items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0116 0"
              ></path>
            </svg>
            <span>Creating...</span>
          </span>
        ) : (
          "Create Account"
        )}
      </button>

      {message && (
        <p
          className={`text-center mt-4 text-sm font-medium ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateAccount;

import { useState } from "react";
import axios from "axios";

const Withdraw = ({ userId, fetchBalance }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      setMessage("Enter a valid withdrawal amount.");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/accounts/withdraw",
        {
          userId,
          amount: Number(amount),
        }
      );

      if (!response.data.success) {
        setMessage(response.data.message || "Withdrawal failed.");
        setIsError(true);
      } else {
        setMessage(response.data.message || "Withdrawal successful!");
        setIsError(false);
        fetchBalance();
      }

      setAmount("");
      window.location.reload();
    } catch (error) {
      setMessage("Withdrawal failed. Check balance and try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg max-w-md mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Withdraw Money
      </h2>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <button
        onClick={handleWithdraw}
        className={`w-full py-3 rounded-lg text-white font-medium transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
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
            <span>Processing...</span>
          </span>
        ) : (
          "Withdraw"
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

export default Withdraw;

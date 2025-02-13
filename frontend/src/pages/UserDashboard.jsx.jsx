import { useState, useEffect } from "react";
import axios from "axios";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw ";
import CreateAccount from "../components/CreateAccount";

const UserDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [hasAccount, setHasAccount] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    const fetchAccount = async () => {
      try {
        const res = await axios.get(
          `https://bankingsystem-zapd.onrender.com/api/accounts/${userId}`
        );

        if (res.data.success && res.data.account) {
          setTransactions(res.data.account.transactions || []);
          setBalance(res.data.account.balance || 0);
        } else {
          setHasAccount(false);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setHasAccount(false);
        } else {
          console.error("Error fetching account:", error);
        }
      }
    };

    fetchAccount();
  }, [userId]);

  const fetchBalance = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `https://bankingsystem-zapd.onrender.com/api/accounts/${userId}`
      );
      setBalance(response.data.account?.balance || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          User Dashboard
        </h1>

        {!hasAccount ? (
          <div className="mt-6">
            <CreateAccount
              userId={userId}
              onSuccess={() => window.location.reload()}
            />
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg text-center my-6 shadow-md">
              <h2 className="text-xl font-semibold">Your Balance</h2>
              <p className="text-3xl font-bold mt-2">₹{balance}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Deposit userId={userId} fetchBalance={fetchBalance} />
              <Withdraw userId={userId} fetchBalance={fetchBalance} />
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Recent Transactions
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                {transactions.length > 0 ? (
                  <ul className="divide-y divide-gray-300">
                    {transactions.map((txn, index) => (
                      <li
                        key={index}
                        className="flex justify-between py-2 px-2"
                      >
                        <span
                          className={`font-semibold ${
                            txn.type === "deposit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {txn.type.toUpperCase()}
                        </span>
                        <span className="font-medium">₹{txn.amount}</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(txn.date).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">
                    No transactions found.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

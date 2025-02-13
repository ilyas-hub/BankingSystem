import { useState, useEffect } from "react";
import axios from "axios";

const BankerDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/getCustomers`,
          {
            withCredentials: true,
          }
        );

        setCustomers(response.data.customers); 
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch customers.");
        console.error("Error fetching customers:", err);
      }
    };

    fetchCustomers();
  }, []);

 
  const showTransactions = (customer) => {
    setSelectedUser(customer);
    setTransactions(customer.transactions);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Banker Dashboard
        </h2>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="mt-6">
          {customers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Balance</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="py-3 px-4 font-semibold">
                        {customer.userId?.username || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-green-600 font-medium">
                        ₹{customer.balance}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                          onClick={() => showTransactions(customer)}
                        >
                          View Transactions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No customers found.</p>
          )}
        </div>


        {selectedUser && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Transaction History - {selectedUser.userId.username}
              </h3>
              <button
                className="text-red-500 font-bold"
                onClick={() => setSelectedUser(null)}
              >
                ✖ Close
              </button>
            </div>
            {transactions.length > 0 ? (
              <ul className="mt-3">
                {transactions.map((tx, index) => (
                  <li key={index} className="p-2 border-b flex justify-between">
                    <span className="font-semibold capitalize">{tx.type}:</span>
                    <span
                      className={`font-medium ${
                        tx.type === "deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ₹{tx.amount}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(tx.date).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-500">No transactions found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BankerDashboard;

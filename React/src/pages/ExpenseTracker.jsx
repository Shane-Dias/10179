import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const addTransaction = () => {
    if (!description || !amount) return;
    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    };
    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome + totalExpenses;

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Expense Tracker</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={addTransaction}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </div>
      <h3 className="text-lg font-bold">Balance: ${balance.toFixed(2)}</h3>
      <p className="text-green-600">Total Income: ${totalIncome.toFixed(2)}</p>
      <p className="text-red-600">
        Total Expenses: ${totalExpenses.toFixed(2)}
      </p>
      <ul className="mt-4">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between p-2 bg-white shadow mb-2 rounded"
          >
            <span>{transaction.description}</span>
            <span
              className={
                transaction.amount > 0 ? "text-green-600" : "text-red-600"
              }
            >
              ${transaction.amount.toFixed(2)}
            </span>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="bg-red-500 text-white px-2 rounded"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button
        className="px-6 py-3 fixed bottom-10 right-10 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        onClick={() => {
          navigate("/");
        }}
      >
        Next
      </button>
      <button
        className="px-6 py-3 fixed bottom-10 left-10 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        onClick={() => {
          navigate("/clock");
        }}
      >
        Previous
      </button>
    </div>
  );
}

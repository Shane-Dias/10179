import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-3xl font-semibold text-gray-800 mb-4">
          Count: {count}
        </div>
        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={handleIncrement}
          >
            Increment
          </button>
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={handleDecrement}
          >
            Decrement
          </button>
          <button
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <button
          className="px-6 py-3 fixed bottom-10 right-10 bg-blue-500 text-white rounded-lg shadow-md"
          onClick={() => {
            navigate("/color_picker");
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Counter;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DigitalClk = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      setTime({
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes(),
        seconds: currentDate.getSeconds(),
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white justify-center items-center">
      <h2 className="text-center text-4xl mb-10 text-teal-600">
        Digital Clock
      </h2>
      <div className="flex mb-4">
        <p className="p-3 border-white border-2 rounded-md bg-gray-800 text-center w-20">
          Hours
        </p>
        <p className="p-3 border-white border-2 rounded-md bg-gray-800 text-center w-20">
          Minutes
        </p>
        <p className="p-3 border-white border-2 rounded-md bg-gray-800 text-center w-20">
          Seconds
        </p>
      </div>
      <div className="flex mb-8">
        <p className="p-3 border-white border-2 rounded-md bg-gray-800 text-center w-20">
          {time.hours.toString().padStart(2, "0")}
        </p>
        <p className="p-3 border-white border-2 rounded-md bg-gray-800 text-center w-20">
          {time.minutes.toString().padStart(2, "0")}
        </p>
        <p className="p-3 border-white border-2 rounded-md bg-gray-800 text-center w-20">
          {time.seconds.toString().padStart(2, "0")}
        </p>
      </div>
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
          navigate("/color_picker");
        }}
      >
        Previous
      </button>
    </div>
  );
};

export default DigitalClk;

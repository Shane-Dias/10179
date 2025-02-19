import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ColorPicker = () => {
  const [bgColor, setBgColor] = useState("white");
  const navigate = useNavigate();

  const handleColorChange = (event) => {
    // console.log(event);
    // console.log(event.target)
    setBgColor(event.target.value);
  };

  return (
    <div className="h-screen" style={{ backgroundColor: bgColor }}>
      <label htmlFor="selectColor">Select Color to change bg:</label>
      <input
        className="border ml-2"
        type="color"
        id="selectColor"
        onChange={handleColorChange}
      />
      <button
        className="px-6 py-3 fixed bottom-10 right-10 bg-blue-500 text-white rounded-lg shadow-md"
        onClick={() => {
          navigate("/color_picker");
        }}
      >
        Next
      </button>
      <button
        className="px-6 py-3 fixed bottom-10 left-10 bg-blue-500 text-white rounded-lg shadow-md"
        onClick={() => {
          navigate("/");
        }}
      >
        Previous
      </button>
    </div>
  );
};

export default ColorPicker;

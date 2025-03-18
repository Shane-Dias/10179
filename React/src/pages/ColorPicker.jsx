import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ColorPicker = () => {
  const [bgColor, setBgColor] = useState("white");
  const [name, setName] = useState("")
  const navigate = useNavigate();

  const handleColorChange = (event) => {
    // console.log(event);
    // console.log(event.target)
    setBgColor(event.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value)
  }
  

  return (
    <div className="h-screen" style={{ backgroundColor: bgColor }}>
      <h2 className="text-center text-4xl mb-16 text-teal-600">Color Picker</h2>
      <div className="flex flex-col justify-center items-center gap-4">
        <label htmlFor="selectColor">Select Color to change bg:</label>
        <input
          className="border ml-2"
          type="color"
          id="selectColor"
          onChange={handleColorChange}
          defaultValue="#ffffff"
        />
      </div>
      <input type="text" className=""  placeholder="Enter name" onChange={handleName}/>
      <button
        className="px-6 py-3 fixed bottom-10 right-10 bg-blue-500 text-white rounded-lg shadow-md"
        onClick={() => {
          navigate("/clock");
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

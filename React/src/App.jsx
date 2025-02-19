import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "./pages/Counter";
import ColorPicker from "./pages/ColorPicker";
import DigitalClk from "./pages/DigitalClk";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/color_picker" element={<ColorPicker />} />
        <Route path="/clock" element={<DigitalClk />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

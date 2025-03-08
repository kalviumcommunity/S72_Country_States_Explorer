import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import CardEntity from "./cardEntity"; // ✅ Use PascalCase

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cities" element={<CardEntity />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;

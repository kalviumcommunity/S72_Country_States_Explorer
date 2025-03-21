import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import CardEntity from "./cardEntity"; // ✅ Use PascalCase
import MongoCities from "./MongoCities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cities" element={<CardEntity />} />  
        <Route path="/mongo-cities" element={<MongoCities />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"; // Add this
import LandingPage from "./LandingPage";
import CardEntity from "./cardEntity";
import MongoCities from "./MongoCities";
import AddStateForm from "./AddStateForm";
import UpdateCityForm from "./Components/UpdateCityForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Show Login page first */}
        <Route path="/home" element={<LandingPage />} /> {/* Move landing page here */}
        <Route path="/cities" element={<CardEntity />} />
        <Route path="/mongo-cities" element={<MongoCities />} />
        <Route path="/add-state" element={<AddStateForm />} />
        <Route path="/cities/update/:id" element={<UpdateCityForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

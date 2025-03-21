import React from "react";

const StateCard = ({ name, description, population, capital}) => {
  return (
    <div style={{ border: "1px solid white", padding: "10px", margin: "10px", color: "white" }}>
      <h2>{name || "Unknown State"}</h2>
      <p><strong>Population:</strong> {population ? population.toLocaleString() : "N/A"}</p>
      <p><strong>Description:</strong> {description || "Unknown"}</p>
      <p><strong>Capital:</strong> {capital || "Unknown Capital"}</p>
    </div>
  );
};

export default StateCard;

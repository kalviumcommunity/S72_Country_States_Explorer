import React from "react";

const StateCard = ({ name, country, description, population, capital }) => {
  return (
    <div style={{ border: "1px solid white", padding: "10px", margin: "10px", color: "white" }}>
      <h2>{name || "Unknown State"}</h2>
      <p><strong>Country:</strong> {country || "Unknown Country"}</p>
      <p><strong>Population:</strong> {population ? population.toLocaleString() : "N/A"}</p>
      <p><strong>Description:</strong> {description || "Unknown"}</p>
      <p><strong>Capital:</strong> {capital ? "Yes" : "No"}</p>
    </div>
  );
};

export default StateCard;

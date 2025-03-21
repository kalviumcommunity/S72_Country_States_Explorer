import React, { useEffect, useState } from "react";
import StateCard from "./Components/StateCard"; // Adjust the path if needed


const MongoCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/cities") // Backend API URL
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Cities:", data); // Debugging
        setCities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setLoading(false);
      });
  }, []);


  return (
    <div style={{ backgroundColor: "black", padding: "20px" }}>
      <h1 style={{ color: "white", textAlign: "center" }}>MongoDB Cities</h1>
      {loading ? (
        <p style={{ color: "white" }}>Loading cities...</p>
      ) : cities.length > 0 ? (
        cities.map((city, index) => (
          <StateCard 
            key={index}
            name={city.name}
            population={city.population}
            description={city.description}
            capital={city.capital ? "Yes" : "No"}
          />
        ))
      ) : (
        <p style={{ color: "white" }}>No cities found.</p>
      )}
    </div>
  );
};

export default MongoCities;

import React, { useEffect, useState } from "react";
import StateCard from "./Components/StateCard";
import { useNavigate } from "react-router-dom";

const MongoCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCities = () => {
    fetch("http://localhost:3000/cities")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Cities:", data);
        setCities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      try {
        const response = await fetch(`http://localhost:3000/cities/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchCities(); // Refresh the list after deletion
        } else {
          alert("Failed to delete city");
        }
      } catch (error) {
        console.error("Error deleting city:", error);
        alert("Error deleting city");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/cities/update/${id}`);
  };

  return (
    <div style={{ backgroundColor: "#231650", padding: "20px", minHeight: "100vh" }}>
      <h1 style={{ color: "white", textAlign: "center" }}>MongoDB Cities</h1>
      
      {loading ? (
        <p style={{ color: "white", textAlign: "center" }}>Loading cities...</p>
      ) : cities.length > 0 ? (
        <div style={styles.gridContainer}>
          {cities.map((city) => (
            <div key={city._id} style={styles.cardContainer}>
              <StateCard 
                country={city.country}
                name={city.name}
                population={city.population}
                description={city.description}
                capital={city.capital ? "Yes" : "No"}
              />
              <div style={styles.buttonContainer}>
                <button 
                  onClick={() => handleUpdate(city._id)}
                  style={styles.updateButton}
                >
                  Update
                </button>
                <button 
                  onClick={() => handleDelete(city._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "white", textAlign: "center" }}>No cities found.</p>
      )}
    </div>
  );
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  cardContainer: {
    position: "relative",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px",
  },
  updateButton: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default MongoCities;

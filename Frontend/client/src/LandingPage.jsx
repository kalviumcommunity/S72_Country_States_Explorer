import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Country States Explorer!</h1>
      <p style={styles.text}>
        Input a country name and explore its states or administrative divisions.
      </p>
      {/* ✅ Navigation Button */}
      <Link to="/cities">
        <button style={styles.button}>Explore Cities</button>
      </Link>
      <Link to="/mongo-cities" style={{ color: "white", margin: "10px" }}>
      View MongoDB Cities
    </Link>
    <Link to="/add-state">
        <button>Add a State</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#008081",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "2rem",
    color: "#ffffff",
  },
  text: {
    fontSize: "1.2rem",
    color: "#ffffff",
    maxWidth: "600px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#008081",
    backgroundColor: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
};

export default LandingPage;

import React from "react";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Country States Explorer!</h1>
      <p style={styles.text}>
        Input a country name and explore its states or administrative divisions.
      </p>
    </div>
  );
}

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
};

export default App;
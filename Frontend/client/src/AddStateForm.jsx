import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    population: "",
    description: "",
    capital: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          country: "",
          population: "",
          description: "",
          capital: false,
        });

        navigate("/mongo-cities");
      }
    } catch (error) {
      console.error("Failed to add state:", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add a State</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="State Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="country"
            placeholder="Country Name"
            value={formData.country}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="population"
            placeholder="Population"
            value={formData.population}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={styles.input}
          />
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="capital"
              checked={formData.capital}
              onChange={handleChange}
              style={styles.checkbox}
            />
            Capital City
          </label>
          <button type="submit" style={styles.button}>Add State</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "white",  // Black background
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#FC6C85", // Dark gray form background
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0px 0px 15px rgba(255,255,255,0.1)",
  },
  heading: {
    color: "#fff",
    fontSize: "22px",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "white",
    color: "#fff",
    outline: "none",
    "::placeholder": {
      color: "black",
    }
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    fontSize: "14px",
    marginBottom: "15px",
  },
  checkbox: {
    marginRight: "10px",
  },
  button: {
    backgroundColor: "#008080", // Teal button
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AddStateForm;

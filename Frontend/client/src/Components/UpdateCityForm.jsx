import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    population: '',
    description: '',
    capital: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching city with ID:", id);
  
    fetch(`http://localhost:3000/cities/${id}`)
      .then(res => {
        console.log("Response Status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("City Data:", data);
        setFormData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setError("Failed to fetch city data");
        setLoading(false);
      });
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/cities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        }
        throw new Error('Failed to update city');
      }

      navigate('/mongo-cities'); // Navigate back to cities list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (
    <div style={{ backgroundColor: "#231650", padding: "20px", minHeight: "100vh", color: "white", textAlign: "center" }}>
      <h2>Loading city data...</h2>
    </div>
  );

  if (error) return (
    <div style={{ backgroundColor: "#231650", padding: "20px", minHeight: "100vh", color: "white", textAlign: "center" }}>
      <h2>Error</h2>
      <p style={{ color: "#f44336" }}>{error}</p>
      <button 
        onClick={() => navigate('/mongo-cities')}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#231650", padding: "20px", minHeight: "100vh", color: "white" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Update City</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Population:</label>
          <input
            type="number"
            name="population"
            value={formData.population}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              name="capital"
              checked={formData.capital}
              onChange={handleChange}
              style={styles.checkbox}
            />
            Is Capital
          </label>
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            Update City
          </button>
          <button
            type="button"
            onClick={() => navigate('/mongo-cities')}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  form: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#2a1f6d",
    borderRadius: "8px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  checkbox: {
    marginRight: "8px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UpdateCityForm; 
const express = require("express");
const City = require("./models/City"); // Import schema
const router = express.Router();

// CREATE - Add a new city
router.post('/cities', async (req, res) => {
  try {
      const newCity = new City(req.body); // Create a new city
      await newCity.save(); // Save to MongoDB
      res.status(201).json(newCity);
  } catch (error) {
      res.status(500).json({ error: "Failed to add city" });
  }
});


// READ - Get all cities
router.get('/cities', async (req, res) => {
  try {
      const cities = await City.find(); // Fetch data from MongoDB
      res.json(cities);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch cities" });
  }
});





// UPDATE - Update a city by ID
router.put("/cities/:id", async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCity) return res.status(404).json({ error: "City not found" });

    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE - Remove a city by ID
router.delete("/cities/:id", async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.id);
    if (!deletedCity) return res.status(404).json({ error: "City not found" });

    res.status(200).json({ message: "City deleted successfully.", city: deletedCity });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

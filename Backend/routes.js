const express = require("express");
const { body, validationResult } = require("express-validator");
const City = require("./models/City"); // Import schema
const { ObjectId } = require("mongodb");

const router = express.Router();

// CREATE - Add a new city with validation
router.post(
  "/cities",
  [
    body("name").notEmpty().withMessage("City name is required"),
    body("country").notEmpty().withMessage("Country name is required"),
    body("population").isInt({ min: 1 }).withMessage("Population must be a positive integer"),
    body("description").optional().isString(),
    body("capital").isBoolean().withMessage("Capital must be a boolean"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCity = new City(req.body);
      await newCity.save();
      res.status(201).json(newCity);
    } catch (error) {
      res.status(500).json({ error: "Failed to add city" });
    }
  }
);

// READ - Get all cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find(); // Fetch data from MongoDB
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// READ - Get a single city by ID
router.get("/cities/:id", async (req, res) => {
  console.log("Received request for city ID:", req.params.id);

  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid city ID format" });
    }

    const city = await City.findOne({ _id: new ObjectId(req.params.id) });

    if (!city) {
      console.log("City not found in DB");
      return res.status(404).json({ error: "City not found" });
    }

    console.log("City found:", city);
    res.json(city);
  } catch (err) {
    console.error("Error fetching city:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE - Update a city by ID
router.put("/cities/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid city ID format" });
    }

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
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid city ID format" });
    }

    const deletedCity = await City.findByIdAndDelete(req.params.id);
    if (!deletedCity) return res.status(404).json({ error: "City not found" });

    res.status(200).json({ message: "City deleted successfully.", city: deletedCity });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

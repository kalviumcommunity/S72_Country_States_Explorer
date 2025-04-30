const express = require("express");
const { body, validationResult } = require("express-validator");
const City = require("../models/City"); // Import schema
const User = require('../models/User');
const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
      const { username, password } = req.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'strict',          // Adjust if using cross-site cookies
      secure: process.env.NODE_ENV === 'production' // Use only in production over HTTPS
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});


router.post(
  "/cities",
  [
    body("name").notEmpty().withMessage("State name is required"),
    body("country").notEmpty().withMessage("Country name is required"),
    body("population").isInt({ min: 1 }).withMessage("Population must be a positive integer"),
    body("description").optional().isString(),
    body("capital").isBoolean().withMessage("Capital must be a boolean"),
    body("created_by").notEmpty().withMessage("Created by is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCity = new City(req.body); // req.body now must include `created_by`
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
  const { id } = req.params;
  const { name, country, population, description, isCapital } = req.body;

  // Validate ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid city ID format" });
  }

  // Validate required fields
  if (!name || !country || population == null || !description || isCapital == null) {
    return res.status(400).json({ error: "All fields (name, country, population, description, isCapital) are required" });
  }

  try {
    const updatedCity = await City.findByIdAndUpdate(
      id,
      { name, country, population, description, isCapital },
      { new: true, runValidators: true }
    );

    if (!updatedCity) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(updatedCity);
  } catch (error) {
    console.error("Error updating city:", error);
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

// GET - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('username _id'); // Only fetch username and _id
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

// In-memory array to store city data
let cities = [];

// CREATE - Add a new city
router.post('/cities', (req, res) => {
    const { name, population, description, is_capital } = req.body;

    if (!name || !population) {
        return res.status(400).send('Name and population are required.');
    }

    const newCity = {
        id: cities.length + 1,  // Simple ID generation
        name,
        population,
        description: description || '',
        is_capital: is_capital !== undefined ? is_capital : true
    };

    cities.push(newCity);
    res.status(201).json(newCity);
});

// READ - Get all cities
router.get('/cities', (req, res) => {
    res.status(200).json(cities);
});

// READ - Get a single city by ID
router.get('/cities/:id', (req, res) => {
    const cityId = parseInt(req.params.id);
    const city = cities.find(c => c.id === cityId);

    if (!city) {
        return res.status(404).send('City not found.');
    }

    res.status(200).json(city);
});

// UPDATE - Update a city by ID
router.put('/cities/:id', (req, res) => {
    const cityId = parseInt(req.params.id);
    const cityIndex = cities.findIndex(c => c.id === cityId);

    if (cityIndex === -1) {
        return res.status(404).send('City not found.');
    }

    const { name, population, description, is_capital } = req.body;
    const updatedCity = {
        ...cities[cityIndex],
        name: name || cities[cityIndex].name,
        population: population || cities[cityIndex].population,
        description: description || cities[cityIndex].description,
        is_capital: is_capital !== undefined ? is_capital : cities[cityIndex].is_capital
    };

    cities[cityIndex] = updatedCity;
    res.status(200).json(updatedCity);
});

// DELETE - Remove a city by ID
router.delete('/cities/:id', (req, res) => {
    const cityId = parseInt(req.params.id);
    const cityIndex = cities.findIndex(c => c.id === cityId);

    if (cityIndex === -1) {
        return res.status(404).send('City not found.');
    }

    const deletedCity = cities.splice(cityIndex, 1);
    res.status(200).json({ message: 'City deleted successfully.', city: deletedCity[0] });
});

module.exports = router;

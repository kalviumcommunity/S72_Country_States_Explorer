const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  population: { type: Number, required: true },
  description: { type: String, default: "" },
  capital: { type: Boolean, default: false },
});

const City = mongoose.model("City", citySchema);

module.exports = City;

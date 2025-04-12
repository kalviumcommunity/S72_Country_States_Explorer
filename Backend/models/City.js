const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: { type: String, required: true }, // State name
  country: { type: String, required: true }, // Country name
  population: { type: Number, required: true },
  description: { type: String, default: "" },
  capital: { type: Boolean, default: false },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true
  }
});

const City = mongoose.model("City", citySchema);

module.exports = City;

const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  name: String,
  internal_name: String,
  active: { type: Boolean, default: false },
});

module.exports = mongoose.model("meal", MealSchema);

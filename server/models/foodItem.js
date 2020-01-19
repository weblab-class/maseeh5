const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  venue_id: String, // links to _id field in a venue object
  name: String,
});

module.exports = mongoose.model("foodItem", FoodItemSchema);

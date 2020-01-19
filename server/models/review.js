const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user_id: String, // links to _id field in a user object
  food_id: String, // links to _id field in a foodItem object
  rating: Number,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("review", ReviewSchema);

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const FoodItemSchema = new mongoose.Schema({
  venue: {type: ObjectId, ref: "venue"},
  name: String,
});

module.exports = mongoose.model("foodItem", FoodItemSchema);

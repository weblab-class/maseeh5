const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReviewSchema = new mongoose.Schema({
  creator: { type: ObjectId, ref: "user" },
  food: { type: ObjectId, ref: "foodItem" },
  rating: Number,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

ReviewSchema.index({ content: "text" });

module.exports = mongoose.model("review", ReviewSchema);

const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  name: String,
  internal_name: String,
});

module.exports = mongoose.model("venue", VenueSchema);

const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("venue", VenueSchema);

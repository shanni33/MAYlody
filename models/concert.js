const mongoose = require("mongoose");

// define a schema
const concertSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Feature",
  },
  properties: {
    id: Number,
    series: String,
    date: String,
    event: String,
    city: String,
    loc: String,
    songs: [
      {
        type: String,
      },
    ],
  },
  geometry: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [
      { type: Number, min: -180, max: 180 },
      { type: Number, min: -90, max: 90 },
    ],
  },
});

const Concert = mongoose.model("Concert", concertSchema);
module.exports = Concert;

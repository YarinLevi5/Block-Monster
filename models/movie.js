let mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publish_date: {
    type: Date,
    required: true,
  },
  cast: [
    {
      type: String,
      required: true,
    },
  ],
  origin_country: {
    type: String,
    required: true,
  },
});
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

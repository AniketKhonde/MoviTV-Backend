const mongoose = require('mongoose');

const tvSeriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  vote_average: {
    type: Number,
    required: true
  },
  seasons: {
    type: Number,
    required: true
  },
  episodes: {
    type: Number,
    required: true
  },
  original_language: {
    type: String,
    required: true
  },
  first_air_date: {
    type: Date,
    required: true
  },
  genre_ids: {
    type: [Number],
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  network: {
    type: String
  }
});

const TVSeries = mongoose.model('TVSeries', tvSeriesSchema);

module.exports = TVSeries;

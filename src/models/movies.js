const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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
  runtime: {
    type: Number,
    required: true
  },
  original_language: {
    type: String,
    required: true
  },
  release_date: {
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
  imdb_id: {
    type: String
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

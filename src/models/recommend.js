const mongoose = require('mongoose');

const recommendSchema = new mongoose.Schema({
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
  genres: {
    type: [String],
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

const Recommend = mongoose.model('Recommend', recommendSchema);

module.exports = Recommend;

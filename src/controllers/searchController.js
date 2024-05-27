// controllers/searchController.js

const Movie = require('../models/movies'); // Import your Movie model
const TvSeries = require('../models/tvSeries'); // Import your TV Series model

const search = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required.' });
  }

  try {
    const movieResults = await Movie.find({ title: new RegExp(query, 'i') });
    const tvSeriesResults = await TvSeries.find({ name: new RegExp(query, 'i') });

    const results = [...movieResults, ...tvSeriesResults];
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error performing search', error: error.message });
  }
};

module.exports = {
  search,
};

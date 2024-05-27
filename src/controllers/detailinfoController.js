const Movie = require('../models/movies');
const TVSeries = require('../models/tvSeries');
const RecommendedMovie = require('../models/recommend');
const TrendingMovie = require('../models/trendingmovies');

// Controller function to fetch detailed info by ID
const detailinfo = async (req, res) => {
  const { productId } = req.params;

  try {
    let product;
    let type;

    // Search for movie
    product = await Movie.findById(productId);
    if (product) {
      type = 'movie';
      return res.status(200).json({ type, data: product });
    }

    // Search for TV series
    product = await TVSeries.findById(productId);
    if (product) {
      type = 'tvSeries';
      return res.status(200).json({ type, data: product });
    }

    // Search for recommended movie
    product = await RecommendedMovie.findById(productId);
    if (product) {
      type = 'recommended';
      return res.status(200).json({ type, data: product });
    }

    // Search for trending movie
    product = await TrendingMovie.findById(productId);
    if (product) {
      type = 'trending';
      return res.status(200).json({ type, data: product });
    }

    // If not found, return error
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error: error.message });
  }
};

module.exports = {
  detailinfo
};

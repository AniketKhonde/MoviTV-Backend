const TrendingMovie = require('../models/trendingmovies');

// Controller function to fetch all movies
const getAllTrendingMovies = async (req, res) => {
    try {
        const trendingmovies = await TrendingMovie.find({});
        res.status(200).json(trendingmovies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
    }
};

module.exports = {
    getAllTrendingMovies
};

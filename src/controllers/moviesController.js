const Movie = require('../models/movies');

// Controller function to fetch all movies
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
    }
};

module.exports = {
    getAllMovies
};
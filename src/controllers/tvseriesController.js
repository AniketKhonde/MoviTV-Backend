const Tvseries = require('../models/tvSeries');

// Controller function to fetch all movies
const tvseries = async (req, res) => {
    try {
        const movies = await Tvseries.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
    }
};

module.exports = {
    tvseries
};
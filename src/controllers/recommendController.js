const recommend = require('../models/recommend');

// Controller function to fetch all movies
const getRecommended = async (req, res) => {
    try {
        const movies = await recommend.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
    }
};

module.exports = {
    getRecommended
};
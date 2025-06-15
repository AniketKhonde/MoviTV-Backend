const MovieBookmark = require('../models/movieBookmark');
const mongoose = require('mongoose');

// Controller to handle bookmarking a movie
const addBookmark = async (req, res) => {
    try {
        const { userId, movieId, tmdbId } = req.body;

        if (!userId || !movieId) {
            return res.status(400).json({ error: 'User ID and Movie ID are required' });
        }

        // Use tmdbId if provided, otherwise use movieId
        const finalMovieId = tmdbId || movieId;

        // Check if the movie is already bookmarked by the user
        const existingBookmark = await MovieBookmark.findOne({ 
            user: userId, 
            movieId: finalMovieId 
        });

        if (existingBookmark) {
            return res.status(400).json({ error: 'Movie is already bookmarked' });
        }

        // Create a new movie bookmark
        const newMovieBookmark = new MovieBookmark({
            user: userId,
            movieId: finalMovieId
        });

        await newMovieBookmark.save();
        res.status(201).json({ 
            message: 'Movie bookmarked successfully', 
            bookmark: newMovieBookmark 
        });
    } catch (error) {
        console.error('Error bookmarking movie:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Movie is already bookmarked' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to handle displaying a user's movie bookmarks
const showBookmarks = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch all movie bookmarks for the user
        const bookmarks = await MovieBookmark.find({ user: userId });

        res.status(200).json(bookmarks);
    } catch (error) {
        console.error('Error fetching movie bookmarks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to handle removing a movie bookmark
const removeBookmark = async (req, res) => {
    try {
        const { userId, id } = req.params;

        if (!userId || !id) {
            return res.status(400).json({ error: 'User ID and Movie ID are required' });
        }

        // Validate if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid bookmark ID format' });
        }

        // Find and remove the bookmark using the _id field
        const result = await MovieBookmark.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            user: userId
        });

        if (!result) {
            return res.status(404).json({ error: 'Movie bookmark not found' });
        }

        res.status(200).json({ message: 'Movie bookmark removed successfully' });
    } catch (error) {
        console.error('Error removing movie bookmark:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addBookmark,
    showBookmarks,
    removeBookmark
};

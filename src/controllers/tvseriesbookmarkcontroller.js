const TVSeriesBookmark = require('../models/tvseriesbookmark');
const mongoose = require('mongoose');

// Controller to handle bookmarking a TV series
const addBookmark = async (req, res) => {
    try {
        const { userId, tvSeriesId, tmdbId } = req.body;

        if (!userId || !tvSeriesId) {
            return res.status(400).json({ error: 'User ID and TV Series ID are required' });
        }

        // Use tmdbId if provided, otherwise use tvSeriesId
        const finalTvSeriesId = tmdbId || tvSeriesId;

        // Check if the TV series is already bookmarked by the user
        const existingBookmark = await TVSeriesBookmark.findOne({ 
            user: userId, 
            tvSeriesId: finalTvSeriesId 
        });

        if (existingBookmark) {
            return res.status(400).json({ error: 'TV Series is already bookmarked' });
        }

        // Create a new TV series bookmark
        const newTVSeriesBookmark = new TVSeriesBookmark({
            user: userId,
            tvSeriesId: finalTvSeriesId
        });

        await newTVSeriesBookmark.save();
        res.status(201).json({ 
            message: 'TV Series bookmarked successfully', 
            bookmark: newTVSeriesBookmark 
        });
    } catch (error) {
        console.error('Error bookmarking TV series:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'TV Series is already bookmarked' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to handle displaying a user's TV series bookmarks
const showBookmarks = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch all TV series bookmarks for the user
        const bookmarks = await TVSeriesBookmark.find({ user: userId });

        res.status(200).json(bookmarks);
    } catch (error) {
        console.error('Error fetching TV series bookmarks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to handle removing a TV series bookmark
const removeBookmark = async (req, res) => {
    try {
        console.log('Request params:', req.params); // Debug log
        const { userId, id } = req.params;

        if (!userId || !id) {
            console.log('Missing parameters:', { userId, id }); // Debug log
            return res.status(400).json({ error: 'User ID and TV Series ID are required' });
        }

        // Validate if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid ObjectId:', id); // Debug log
            return res.status(400).json({ error: 'Invalid bookmark ID format' });
        }

        // Find and remove the bookmark using the _id field
        const result = await TVSeriesBookmark.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            user: userId
        });

        if (!result) {
            console.log('Bookmark not found:', { userId, id }); // Debug log
            return res.status(404).json({ error: 'TV Series bookmark not found' });
        }

        res.status(200).json({ message: 'TV Series bookmark removed successfully' });
    } catch (error) {
        console.error('Error removing TV series bookmark:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addBookmark,
    showBookmarks,
    removeBookmark
};

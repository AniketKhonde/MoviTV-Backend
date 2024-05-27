require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const TvSeries = require('../models/tvseries');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

// Connect to MongoDB database
mongoose.connect(URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Route to fetch and store top 50 foreign TV series without cast
app.get('/fetchTopindiaTVSeries', async (req, res) => {
    try {
        // Fetch top 50 foreign TV series from TMDB API
        const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                sort_by: 'popularity.desc',
                page: 1,
                with_original_language: 'hi', // Filter by original language (Hindi)
                region: 'IN' // Filter by region (India)
            }
        });

        // Extract relevant TV series details
        const tvSeriesData = response.data.results.slice(0, 50).map(series => ({
            name: series.name,
            poster_path: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
            vote_average: series.vote_average,
            episode_run_time: series.episode_run_time,
            first_air_date: new Date(series.first_air_date),
            original_language: series.original_language,
            overview: series.overview,
            genres: series.genre_ids.map(genreId => genreId.toString()), // Convert genre IDs to strings
            imdb_id: series.id
        }));

        // Store TV series in MongoDB
        await TvSeries.insertMany(tvSeriesData);

        res.status(200).send('Top 50 foreign TV series stored successfully.');
    } catch (error) {
        console.error('Error fetching and storing foreign TV series:', error);
        res.status(500).send('Internal server error.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

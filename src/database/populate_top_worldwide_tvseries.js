const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const TvSeries = require('../models/tvseries');
require('dotenv').config();
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

// Connect to MongoDB database
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Route to fetch and store top 50 foreign TV series with cast
app.get('/fetchTopForeignTVSeries', async (req, res) => {
    try {
        // Fetch top 50 foreign TV series from TMDB API
        const apiKey = process.env.TMDB_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_original_language=!en`);

        // Iterate through each TV series to fetch details and cast
        const tvSeries = [];
        for (const series of response.data.results.slice(0, 50)) {
            // Fetch TV series details
            const seriesDetails = {
                name: series.name,
                poster_path: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
                vote_average: series.vote_average,
                episode_run_time: series.episode_run_time,
                first_air_date: new Date(series.first_air_date),
                original_language: series.original_language,
                overview: series.overview,
                genres: series.genre_ids.map(genreId => genreId.toString()), // Convert genre IDs to strings
                cast: [] // Placeholder for cast
            };

            // Fetch cast for the TV series
            const castResponse = await axios.get(`https://api.themoviedb.org/3/tv/${series.id}/credits?api_key=${apiKey}`);
            seriesDetails.cast = castResponse.data.cast.map(actor => actor.name);

            tvSeries.push(seriesDetails);
        }

        // Store TV series in MongoDB
        await TvSeries.insertMany(tvSeries);

        res.status(200).send('Top 50 foreign TV series with cast stored successfully.');
    } catch (error) {
        console.error('Error fetching and storing foreign TV series with cast:', error);
        res.status(500).send('Internal server error.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



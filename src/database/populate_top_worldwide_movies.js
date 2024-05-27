
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Movie = require('../models/movies');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

// Connect to MongoDB database
console.log('###########3URI:', URI);

mongoose.connect(URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Route to fetch and store top 100 Indian movies
app.get('/fetchTopworldwideMovies', async (req, res) => {
    try {
        // Fetch top 100 Indian movies from TMDB API
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&region=US&sort_by=popularity.desc&page=1`);

        // Extract relevant movie details
        const movies = response.data.results.slice(0, 100).map(movie => ({
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            vote_average: movie.vote_average,
            runtime: movie.runtime || 0, // Provide a default value if runtime is missing
            original_language: movie.original_language,
            release_date: new Date(movie.release_date),
            genres: movie.genre_ids.map(genreId => genreId.toString()), // Convert genre IDs to strings
            overview: movie.overview,
            imdb_id: movie.imdb_id
        }));

        // Store movie details in MongoDB
        await Movie.insertMany(movies);

        res.status(200).send('Top 100 world wide stored successfully.');
        console.log('Top 100 world wide stored successfully');
    } catch (error) {
        console.error('Error fetching and storing movies:', error);
        res.status(500).send('Internal server error.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

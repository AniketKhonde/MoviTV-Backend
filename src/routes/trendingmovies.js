const express = require('express');
const router = express.Router();
const { getAllTrendingMovies } = require('../controllers/trendingmovieController');

router.get('/', getAllTrendingMovies);

module.exports = router;
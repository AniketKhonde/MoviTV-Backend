const express = require('express');
const router = express.Router();
const { getAllMovies } = require('../controllers/moviesController');

router.get('/', getAllMovies);

module.exports = router;
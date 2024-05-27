const express = require('express');
const router = express.Router();
const { tvseries } = require('../controllers/tvseriesController');

router.get('/', tvseries);

module.exports = router;
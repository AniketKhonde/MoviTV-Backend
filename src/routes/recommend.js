const express = require('express');
const router = express.Router();
const { getRecommended } = require('../controllers/recommendController');

router.get('/', getRecommended);

module.exports = router;
const express = require('express');
const router = express.Router();
const {detailinfo}= require('../controllers/detailinfoController');

// Route to fetch product details by ID
router.get('/:productId', detailinfo);

module.exports = router;

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/showProfileController');

// Route to fetch the user's profile
router.get('/:userId', profileController.getProfile);

module.exports = router;
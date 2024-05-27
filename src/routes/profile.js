const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route to fetch the user's profile
router.put('/:userId', profileController.updateProfile);

module.exports = router;
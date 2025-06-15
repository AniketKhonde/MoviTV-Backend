const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');

// Controller function to get user profile data
const getProfile = async (req, res) => {
    try {
        const token = req.params.userId; // This is actually the JWT token
        
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Find the profile by userId
        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error('Error getting profile:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller function to update user profile data
const updateProfile = async (req, res) => {
    try {
        const token = req.params.userId; // This is actually the JWT token
        
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const updatedProfileData = req.body;

        // Find the profile by userId
        let profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Update profile data with the new data
        profile = await Profile.findOneAndUpdate(
            { userId }, 
            updatedProfileData, 
            { new: true, runValidators: true }
        );

        res.json(profile);
    } catch (error) {
        console.error('Error updating profile:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};

// Assuming you have a Profile model
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');

// Controller function to get user profile data
const getProfile = async (req, res) => {
    try {
        const token = req.params.userId;
        
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Find the profile by userId
        const profile = await Profile.findOne({ userId: userId.toString() });

        if (!profile) {
            // If profile doesn't exist, create a new one
            const newProfile = new Profile({
                userId: userId.toString(),
                email: decoded.email || '',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await newProfile.save();
            return res.json(newProfile);
        }

        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
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
};

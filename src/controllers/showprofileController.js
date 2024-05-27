// Assuming you have a Profile model
const Profile = require('../models/profile');

// Controller function to get user profile data
const getProfile = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the profile by userId
        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProfile,
};


const Profile = require('../models/profile');

// Controller function to update user profile data
const updateProfile = async (req, res) => {
    const userId = req.params.userId;
    const updatedProfileData = req.body;

    try {
        // Find the profile by userId
        let profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Update profile data with the new data
        profile = await Profile.findOneAndUpdate({ userId }, updatedProfileData, { new: true });

        res.json(profile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    updateProfile,
};

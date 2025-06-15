const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Profile = require('../models/profile');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    scope: ['profile', 'email']
},
async function(accessToken, refreshToken, profile, done) {
    try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            // If user exists but doesn't have Google ID, update it
            if (!user.googleId) {
                user.googleId = profile.id;
                user.picture = profile.photos[0].value;
                user.loginMethod = 'google';
                await user.save();
            }
            return done(null, user);
        }

        // Create new user if doesn't exist
        user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            picture: profile.photos[0].value,
            loginMethod: 'google'
        });

        // Create profile for the new user
        await Profile.create({
            userId: user._id.toString(),
            email: profile.emails[0].value,
            fullName: profile.displayName,
            profilePicture: profile.photos[0].value,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport; 
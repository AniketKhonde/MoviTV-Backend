const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth login route
router.get('/google',
    (req, res, next) => {
        // Store the redirect_uri in the session or pass it through state
        const state = Buffer.from(JSON.stringify({
            redirect_uri: req.query.redirect_uri || process.env.FRONTEND_URL + '/LoginPage'
        })).toString('base64');
        
        passport.authenticate('google', { 
            scope: ['profile', 'email'],
            state: state
        })(req, res, next);
    }
);

// Google OAuth callback route
router.get('/google/callback',
    passport.authenticate('google', { 
        failureRedirect: `${process.env.FRONTEND_URL}/LoginPage?error=auth_failed`,
        session: false
    }),
    function(req, res) {
        try {
            // Parse the state parameter to get the redirect URI
            const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString());
            const redirectUri = state.redirect_uri || `${process.env.FRONTEND_URL}/LoginPage`;

            // Create user data object
            const userData = {
                success: true,
                user: req.user
            };

            // Redirect to frontend with user data
            const redirectUrl = `${redirectUri}?auth=success&userData=${encodeURIComponent(JSON.stringify(userData))}`;
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error in callback:', error);
            res.redirect(`${process.env.FRONTEND_URL}/LoginPage?error=auth_failed`);
        }
    }
);

// Logout route
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router; 
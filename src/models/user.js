const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// Check if the model already exists before creating it
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: function() {
                return !this.googleId; // Password is required only if not a Google user
            }
        },
        googleId: {
            type: String,
            sparse: true
        },
        picture: {
            type: String
        },
        loginMethod: {
            type: String,
            enum: ['manual', 'google'],
            required: true
        },
        accessToken: { 
            type: String 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        updatedAt: { 
            type: Date, 
            default: Date.now 
        }
    }
));

// Add the pre-save middleware
User.schema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.password) {  // Skip if password not modified or not present (Google login)
        return next();
    }
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = User;
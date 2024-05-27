const mongoose = require('mongoose');
const User = require('./user'); // Import user schema

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, ref: 'User' },// Assuming email is a string
  fullName: { type: String, required: false },
  dateOfBirth: { type: Date, default: null }, // Set default value to null for optional field
  gender: { type: String, enum: ['male', 'female', 'other'] },
  address: {
    street: { type: String, default: null }, // Set default value to null for optional field
    city: { type: String, default: null }, // Set default value to null for optional field
    state: { type: String, default: null }, // Set default value to null for optional field
    country: { type: String, default: null } // Set default value to null for optional field
  },
  contact: {
    email: { type: String, default: null }, // Set default value to null for optional field
    phone: { type: String, default: null } // Set default value to null for optional field
  },
  profilePicture: { type: String }, // URL to profile picture
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

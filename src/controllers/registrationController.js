const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Profile = require("../models/profile"); // Assuming you have a Profile model

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();

        // Create a profile for the newly registered user
        const newProfile = new Profile({
            userId: newUser._id, // Assign the user's ObjectId to userId field in profile
            // You can add other profile fields here if needed
            username,
            email
        });

        // Save the profile to the database
        await newProfile.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h" // Token expires in 1 hour
        });
        // Respond with success message and token
        res.status(201).json({ message: "User registered successfully",jwtToken:token , userId: newUser._id });
    } catch (error) {
        console.error("registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports= {registerUser};
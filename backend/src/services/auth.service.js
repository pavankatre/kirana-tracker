const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/env.config');

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// CRUCIAL: Ensure it says 'exports.registerUser'
exports.registerUser = async (userData) => {
    const { email, password, username } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists with this email');
    }

    const user = await User.create({
        username,
        email,
        password
    });

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    };
};


exports.loginUser = async (credentials) => {
    const { email, password } = credentials;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // 2. Check if password matches (We need to add the compare method to the Model)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // 3. Return user data and a new token
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    };
};
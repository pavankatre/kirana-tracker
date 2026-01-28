const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env.config');

exports.protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Attach user info to the request object
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
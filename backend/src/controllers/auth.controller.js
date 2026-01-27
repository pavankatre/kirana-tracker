const authService = require('../services/auth.service');

exports.register = async (req, res, next) => { // <--- Must be in this order!
    try {

        // Log to terminal so we can see what Postman is sending
        console.log("📥 Register Request Body:", req.body);
        const userData = req.body;
        const result = await authService.registerUser(userData);
        
        // Use 'return' to ensure the function stops here
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: result
        });
    } catch (error) {
        // If next is failing, it's safer to send a direct response for now
        return res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: result
        });
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: error.message
        });
    }
};
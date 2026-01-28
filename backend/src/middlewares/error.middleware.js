// backend/src/middlewares/error.middleware.js
const errorHandler = (err, req, res, next) => {
    console.error('--- ERROR LOG ---');
    console.error(err.stack); // This shows exactly where the code failed

    // Default values if the error doesn't have them
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Send a structured JSON response to Angular
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        // Only show full stack trace in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};

module.exports = errorHandler;
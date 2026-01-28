const app = require('./src/app');
const connectDB = require('./src/config/db.config');
const { PORT } = require('./src/config/env.config');


// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`🚀 Server running on http://localhost:${PORT}`);
//         });
//     } catch (error) {
//         console.error('❌ Failed to start server:', error.message);
//         process.exit(1); // Stop the process if we can't connect to DB
//     }
// };
const startServer = async () => {
    try {
        await connectDB();
        // Add '0.0.0.0' here to make it accessible to Render
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running and accessible on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
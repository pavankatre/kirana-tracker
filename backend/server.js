const app = require('./src/app');
const connectDB = require('./src/config/db.config');
const { PORT } = require('./src/config/env.config');

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();
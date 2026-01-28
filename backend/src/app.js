const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/error.middleware');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes'); // 1. Import the routes

const app = express();

app.use(cors());
app.use(express.json()); // 2. Essential for parsing Postman JSON data

// 3. Link the routes to a path
app.use('/api/auth', authRoutes); 

// Add this line after your auth routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Kirana Tracker API is running...');
});
app.use(errorHandler);

module.exports = app;
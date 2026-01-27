const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes'); // 1. Import the routes

const app = express();

app.use(cors());
app.use(express.json()); // 2. Essential for parsing Postman JSON data

// 3. Link the routes to a path
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
    res.send('Kirana Tracker API is running...');
});

module.exports = app;
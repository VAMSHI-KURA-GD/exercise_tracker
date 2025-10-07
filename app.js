const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const exerciseRoutes = require('./src/routes/exerciseRoutes');
const errorHandler = require('./src/middleware/errorHandler');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.use('/api', userRoutes);
app.use('/api', exerciseRoutes);

// Error handling
app.use(errorHandler);

module.exports = app; 
// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const habitRoutes = require('./routes/habit_routes');
const connectDB = require('./config/db');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001; // Use PORT from .env or default to 5001

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/habits', habitRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


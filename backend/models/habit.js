// backend/models/habit.js

const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  completedDays: { type: [Boolean], default: [false, false, false, false, false, false, false] }, // Array for each day of the week
  streak: { type: Number, default: 0 },
  category: { type: String, default: 'General' },
  startDate: { type: Date, default: Date.now },
  longestStreak: { type: Number, default: 0 } // Optional for tracking the longest streak
});

module.exports = mongoose.model('Habit', habitSchema);

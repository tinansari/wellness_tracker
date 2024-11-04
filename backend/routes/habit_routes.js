// backend/routes/habit_routes.js

const express = require('express');
const {
  getHabits,
  addHabit,
  toggleHabitCompletion,
  deleteHabit,
  resetHabits,
} = require('../controllers/habit_controller'); // Ensure all functions are imported

const router = express.Router();

router.get('/', getHabits); // Retrieve all habits
router.post('/', addHabit); // Add a new habit
router.patch('/:id/toggle/:dayIndex', toggleHabitCompletion); // Toggle a specific day's completion
router.delete('/:id', deleteHabit); // Delete a habit
router.post('/reset', resetHabits); // Reset all habits for a new week

module.exports = router;


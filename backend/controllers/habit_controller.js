// backend/controllers/habit_controller.js

const Habit = require('../models/habit');

// Retrieve all habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
};

// Add a new habit
exports.addHabit = async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    await newHabit.save();
    res.json(newHabit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add habit' });
  }
};

// Toggle completion for a specific day of a habit
exports.toggleHabitCompletion = async (req, res) => {
  try {
    const { id, dayIndex } = req.params; // Expect dayIndex to specify which day to toggle
    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    // Toggle the specific day's completion
    habit.completedDays[dayIndex] = !habit.completedDays[dayIndex];
    
    // Update streak count based on completedDays array
    habit.streak = habit.completedDays.reduce((count, day) => count + (day ? 1 : 0), 0);

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update habit' });
  }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    await Habit.findByIdAndDelete(id);
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete habit' });
  }
};

// Reset all completed days and streaks for a new week
exports.resetHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    habits.forEach(async (habit) => {
      habit.completedDays = [false, false, false, false, false, false, false]; // Reset all days
      habit.streak = 0;
      await habit.save();
    });
    res.json({ message: 'All habits reset for the new week' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset habits' });
  }
};


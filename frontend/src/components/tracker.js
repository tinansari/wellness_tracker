// frontend/src/components/tracker.js

import React, { useState, useEffect } from 'react';
import { fetchHabits, addHabit, toggleHabitCompletion, deleteHabit, resetHabits } from '../utils/api';
import '../styles/tracker.css';

function Tracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [category, setCategory] = useState('General');
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [description, setDescription] = useState('');
  const maxDescriptionLength = 150;

  useEffect(() => {
    const loadHabits = async () => {
      const fetchedHabits = await fetchHabits();
      setHabits(fetchedHabits);
    };
    loadHabits();
  }, []);

  const handleAddHabit = async () => {
    if (newHabit) {
      const habit = await addHabit({ name: newHabit, category });
      setHabits([...habits, habit]);
      setNewHabit('');
      setCategory('General');
    }
  };

  const toggleCompletion = async (id, dayIndex) => {
    const updatedHabit = await toggleHabitCompletion(id, dayIndex);
    setHabits(habits.map((habit) => (habit._id === id ? updatedHabit : habit)));
  };

  const handleDeleteHabit = async (id) => {
    await deleteHabit(id);
    setHabits(habits.filter(habit => habit._id !== id));
    if (selectedHabit && selectedHabit._id === id) {
      setSelectedHabit(null);
    }
  };

  const handleResetHabits = async () => {
    await resetHabits();
    const updatedHabits = await fetchHabits();
    setHabits(updatedHabits);
  };

  const handleSaveDescription = async () => {
    // Update the selected habit's description
    if (selectedHabit) {
      const updatedHabit = { ...selectedHabit, description };
      setHabits(habits.map(habit => (habit._id === selectedHabit._id ? updatedHabit : habit)));
      setSelectedHabit(updatedHabit);
      // Here you would add a request to the backend to save the description if needed
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxDescriptionLength) {
      setDescription(value);
    }
  };

  useEffect(() => {
    // Load description from selected habit when habit is chosen
    if (selectedHabit) {
      setDescription(selectedHabit.description || '');
    }
  }, [selectedHabit]);

  return (
    <div className="tracker-container">
      <h2 className="tracker-title">Health & Wellness Habit Tracker</h2>
      
      <div className="tracker-main">
        {/* Calendar view */}
        <div className="tracker-calendar">
          <div className="calendar-header">
            <span>Habit</span>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <span key={index} className="calendar-day">{day}</span>
            ))}
          </div>
          
          {habits && habits.length > 0 && habits.map((habit) => (
            <div key={habit._id} className="calendar-row" onClick={() => setSelectedHabit(habit)}>
              <span className="calendar-habit-name">{habit.name}</span>
              {habit.completedDays && habit.completedDays.map((completed, dayIndex) => (
                <input
                  key={dayIndex}
                  type="checkbox"
                  className="calendar-checkbox"
                  checked={completed || false}
                  onChange={() => toggleCompletion(habit._id, dayIndex)}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Sidebar with habit info */}
        <div className="tracker-sidebar">
          {selectedHabit ? (
            <>
              <h3>{selectedHabit.name}</h3>
              <p><strong>Category:</strong> {selectedHabit.category}</p>
              <p><strong>Start Date:</strong> {new Date(selectedHabit.startDate).toLocaleDateString()}</p>
              <p><strong>Streak:</strong> {selectedHabit.streak} days</p>
              <p><strong>Longest Streak:</strong> {selectedHabit.longestStreak || 0} days</p>
              
              {/* Description box with character counter */}
              <div className="description-container">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  maxLength={maxDescriptionLength}
                  placeholder="Add a description for this habit..."
                />
                <div className="char-counter">
                  {description.length}/{maxDescriptionLength}
                </div>
                <button onClick={handleSaveDescription} className="save-button">Save</button>
              </div>
              
              <button onClick={() => handleDeleteHabit(selectedHabit._id)} className="delete-button">Delete Habit</button>
            </>
          ) : (
            <p>Select a habit to see details</p>
          )}
        </div>
      </div>

      {/* Add Habit and Reset buttons */}
      <div className="tracker-controls">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Physical">Physical</option>
          <option value="Mental">Mental</option>
          <option value="Diet">Diet</option>
        </select>
        <button onClick={handleAddHabit}>Add Habit</button>
        <button onClick={handleResetHabits}>Restart Week</button>
      </div>
    </div>
  );
}

export default Tracker;

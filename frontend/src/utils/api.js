// frontend/src/utils/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5001/api/habits';

export const fetchHabits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addHabit = async (habit) => {
  const response = await axios.post(API_URL, habit);
  return response.data;
};

export const toggleHabitCompletion = async (id, dayIndex) => {
  const response = await axios.patch(`${API_URL}/${id}/toggle/${dayIndex}`);
  return response.data;
};

export const deleteHabit = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const resetHabits = async () => {
  const response = await axios.post(`${API_URL}/reset`);
  return response.data;
};

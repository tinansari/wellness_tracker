import React from 'react';
import Tracker from './components/tracker';
import Summary from './components/summary';

function App() {
  return (
    <div>
      <h1>Health & Wellness Habit Tracker</h1>
      <Tracker />
      <Summary />
    </div>
  );
}

export default App;

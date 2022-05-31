import React, { useState } from 'react';
import Calendar from './components/Calendar';

function App() {
  const [events, setEvents] = useState({});

  return (
    <div className="container">
      <Calendar
        events={events}
        onAddEvent={(formattedDate, payload) => {
          setEvents((prev) => ({
            ...prev,
            [formattedDate]: [...(prev?.[formattedDate] ?? []), payload],
          }));
        }}
      />
    </div>
  );
}

export default App;

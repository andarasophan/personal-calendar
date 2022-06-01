import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Modal from './components/Modal';
import List from './views/List';

function App() {
  const [events, setEvents] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="container">
      <Calendar
        events={events}
        onClickDay={(date) => {
          setSelectedDate(date);
          setOpenModal(true);
        }}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <List
          onClose={() => setOpenModal(false)}
          events={events}
          selectedDate={selectedDate}
          onAddEvent={(formattedDate, payload) => {
            setEvents((prev) => ({
              ...prev,
              [formattedDate]: [...(prev?.[formattedDate] ?? []), payload],
            }));
          }}
        />
      </Modal>
    </div>
  );
}

export default App;

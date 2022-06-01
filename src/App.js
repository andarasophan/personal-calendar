import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Modal from './components/Modal';
import Views from './views';

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
        <Views
          events={events}
          selectedDate={selectedDate}
          onAddEvent={(formattedDate, payload) => {
            setEvents((prev) => ({
              ...prev,
              [formattedDate]: [...(prev?.[formattedDate] ?? []), payload],
            }));
          }}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

export default App;

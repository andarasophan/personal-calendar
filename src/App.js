import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Modal from './components/Modal';

function App() {
  const [events, setEvents] = useState({});
  const [openModal, setOpenModal] = useState(false);

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
        onClickDay={(date, event) => {
          console.log(date, event);
          setOpenModal(true);
        }}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={{ width: 500, height: 500 }} />
      </Modal>
    </div>
  );
}

export default App;

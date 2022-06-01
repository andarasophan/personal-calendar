import React, { useState, useMemo } from 'react';
import Calendar from './components/Calendar';
import Modal from './components/Modal';
import { customDateFormat } from './utils/helpers/DateHelpers';
import Views from './views';

function App() {
  const [events, setEvents] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(0);

  const eventsOnDate = useMemo(() => {
    if (!selectedDate) return [];
    return events[customDateFormat(selectedDate)] ?? [];
  }, [events, selectedDate]);

  return (
    <div className="container">
      <Calendar
        events={events}
        onClickDay={(date) => {
          setSelectedDate(date);
          setStep(!events[customDateFormat(date)]?.length ? 1 : 0);
          setOpenModal(true);
        }}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Views
          step={step}
          setStep={setStep}
          events={eventsOnDate}
          selectedDate={selectedDate}
          onAddEvent={(formattedDate, payload) => {
            setEvents((prev) => ({
              ...prev,
              [formattedDate]: [...(prev?.[formattedDate] ?? []), payload],
            }));
          }}
          onDeleteEvent={(formattedDate, id) => {
            setEvents((prev) => ({
              ...prev,
              [formattedDate]: prev[formattedDate].filter((el) => el.id !== id),
            }));
          }}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

export default App;

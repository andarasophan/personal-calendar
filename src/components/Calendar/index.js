import React, { useEffect, useContext } from 'react';
import styles from './calendar.module.scss';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import CalendarProvider, { CalendarContext } from './context';

const Calendar = ({ events, onAddEvent = () => {} }) => (
  <CalendarProvider>
    <CalendarRoot events={events} onAddEvent={onAddEvent} />
  </CalendarProvider>
);

const CalendarRoot = ({ events, onAddEvent }) => {
  const { setCurrentEvents } = useContext(CalendarContext);

  useEffect(() => {
    setCurrentEvents(events);
  }, [events, setCurrentEvents]);

  return (
    <div className={styles.calendarRoot}>
      <CalendarHeader />
      <CalendarBody onAddEvent={onAddEvent} />
    </div>
  );
};

export default Calendar;

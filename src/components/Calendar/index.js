import React, { useEffect, useContext } from 'react';
import styles from './calendar.module.scss';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import CalendarProvider, { CalendarContext } from './context';

const Calendar = ({ events, onAddEvent = () => {}, onClickDay = () => {} }) => (
  <CalendarProvider>
    <CalendarRoot
      events={events}
      onAddEvent={onAddEvent}
      onClickDay={onClickDay}
    />
  </CalendarProvider>
);

const CalendarRoot = ({ events, onAddEvent, onClickDay }) => {
  const { setCurrentEvents } = useContext(CalendarContext);

  useEffect(() => {
    setCurrentEvents(events);
  }, [events, setCurrentEvents]);

  return (
    <div className={styles.calendarRoot}>
      <CalendarHeader />
      <CalendarBody onAddEvent={onAddEvent} onClickDay={onClickDay} />
    </div>
  );
};

export default Calendar;

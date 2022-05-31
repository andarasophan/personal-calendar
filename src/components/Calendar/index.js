import React, { useEffect, useContext } from 'react';
import styles from './calendar.module.scss';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import CalendarProvider, { CalendarContext } from './context';

const Calendar = ({ events }) => (
  <CalendarProvider>
    <CalendarRoot events={events} />
  </CalendarProvider>
);

const CalendarRoot = ({ events }) => {
  const { setCurrentEvents } = useContext(CalendarContext);

  useEffect(() => {
    setCurrentEvents(events);
  }, [events, setCurrentEvents]);

  return (
    <div className={styles.calendarRoot}>
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
};

export default Calendar;

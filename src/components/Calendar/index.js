import React, { useEffect, useContext } from 'react';
import styles from './calendar.module.scss';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import CalendarProvider, { CalendarContext } from './context';

const Calendar = ({ events, onClickDay = () => {}, onChangeMonth }) => (
  <CalendarProvider>
    <CalendarRoot
      events={events}
      onClickDay={onClickDay}
      onChangeMonth={onChangeMonth}
    />
  </CalendarProvider>
);

const CalendarRoot = ({ events, onClickDay, onChangeMonth }) => {
  const { setCurrentEvents } = useContext(CalendarContext);

  useEffect(() => {
    setCurrentEvents(events);
  }, [events, setCurrentEvents]);

  return (
    <div className={styles.calendarRoot}>
      <CalendarHeader onChangeMonth={onChangeMonth} />
      <CalendarBody onClickDay={onClickDay} />
    </div>
  );
};

export default Calendar;

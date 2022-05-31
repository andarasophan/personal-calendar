import React, { useMemo } from 'react';
import { customSetDay } from '../../../utils/helpers/DateHelpers';
import styles from './calendarBody.module.scss';
import Day from './Day';

const Week = ({ weekStart, week, onAddEvent }) => {
  const renderDays = useMemo(() => {
    return [0, 1, 2, 3, 4, 5, 6].map((el) => (
      <Day
        key={`week-${week}-day-${el}`}
        day={customSetDay(weekStart, el)}
        onAddEvent={onAddEvent}
      />
    ));
  }, [weekStart, week, onAddEvent]);

  return <div className={styles.week}>{renderDays}</div>;
};

export default Week;

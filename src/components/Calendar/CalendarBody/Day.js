import clsx from 'clsx';
import React, { useContext, useMemo } from 'react';
import {
  isSameMonth,
  customDateFormat,
} from '../../../utils/helpers/DateHelpers';
import { CalendarContext } from '../context';
import styles from './calendarBody.module.scss';

const Day = ({ day }) => {
  const { currentDate, currentEvents } = useContext(CalendarContext);

  const eventOnDay = useMemo(
    () => currentEvents?.[customDateFormat(day)] ?? [],
    [currentEvents, day]
  );

  return (
    <div
      className={clsx(
        styles.day,
        !isSameMonth(day, currentDate) && styles.outside
      )}
    >
      <div className={styles.date}>{day.getDate()}</div>

      <div className={styles.eventWrapper}>
        {eventOnDay.map((el, i) => (
          <div
            key={i}
            style={{ backgroundColor: 'blue' }}
            className={styles.event}
          >
            <p>{el.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;

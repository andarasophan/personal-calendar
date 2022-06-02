import clsx from 'clsx';
import React, { useContext, useMemo } from 'react';
import {
  isSameMonth,
  customDateFormat,
} from '../../../utils/helpers/DateHelpers';
import { CalendarContext } from '../context';
import styles from './calendarBody.module.scss';

const Day = ({ day, onClickDay }) => {
  const { currentDate, currentEvents } = useContext(CalendarContext);

  const eventOnDay = useMemo(
    () => currentEvents?.[customDateFormat(day)] ?? [],
    [currentEvents, day]
  );

  return (
    <button
      className={clsx(
        styles.day,
        !isSameMonth(day, currentDate) && styles.outside
      )}
      onClick={(e) => onClickDay(day, e)}
    >
      <div className={styles.date}>{day.getDate()}</div>

      <div className={styles.eventWrapper}>
        {eventOnDay.map((el) => (
          <div
            key={el.id}
            style={{ backgroundColor: el.color }}
            className={styles.event}
          >
            <p>{el.name}</p>
          </div>
        ))}
      </div>
    </button>
  );
};

export default Day;

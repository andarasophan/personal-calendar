import clsx from 'clsx';
import React, { useContext, useMemo } from 'react';
import { darkColorGenerator } from '../../../utils/helpers/ColorHelpers';
import {
  isSameMonth,
  customDateFormat,
} from '../../../utils/helpers/DateHelpers';
import { CalendarContext } from '../context';
import styles from './calendarBody.module.scss';
import uniqid from 'uniqid';

const Day = ({ day, onAddEvent }) => {
  const { currentDate, currentEvents } = useContext(CalendarContext);

  const eventOnDay = useMemo(
    () => currentEvents?.[customDateFormat(day)] ?? [],
    [currentEvents, day]
  );

  const addEvent = () => {
    // only 3 events allowed
    if (eventOnDay.length >= 3) return;

    /**
     * onAddEvent
     * @param a formatted date of the day
     * @param b payload for that day
     */
    onAddEvent(customDateFormat(day), {
      id: uniqid(),
      name: 'test asdast sdasfq 12312312dasdasd',
      color: darkColorGenerator(),
    });
  };

  return (
    <button
      className={clsx(
        styles.day,
        !isSameMonth(day, currentDate) && styles.outside
      )}
      onClick={addEvent}
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

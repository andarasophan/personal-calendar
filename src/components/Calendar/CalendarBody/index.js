import React, { useMemo, useContext } from 'react';
import {
  getWeeksInMonth,
  customSetDay,
  startOfMonth,
  startOfWeek,
} from '../../../utils/helpers/DateHelpers';
import styles from './calendarBody.module.scss';
import { CalendarContext } from '../context';
import Week from './Week';

const CalendarBody = () => {
  const { currentDate } = useContext(CalendarContext);

  const renderWeeks = useMemo(() => {
    const weeks = [];
    let currentWeekStart = startOfWeek(startOfMonth(currentDate));
    for (let i = 0; i < getWeeksInMonth(currentDate); i++) {
      weeks.push(
        <Week key={`week-${i}`} weekStart={currentWeekStart} week={i} />
      );
      currentWeekStart = customSetDay(currentWeekStart, 7);
    }
    return weeks;
  }, [currentDate]);

  return <div className={styles.body}>{renderWeeks}</div>;
};

export default CalendarBody;

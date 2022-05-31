import React, { useContext } from 'react';
import { EMonth } from '../../utils/enums/EMonth';
import { customSetMonth } from '../../utils/helpers/DateHelpers';
import Button from '../Button';
import SVG from '../SVG';
import styles from './calendar.module.scss';
import { CalendarContext } from './context';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const CalendarHeader = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);

  return (
    <div className={styles.header}>
      <div className={styles.control}>
        <Button
          className={styles.todayBtn}
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </Button>
        <div className={styles.btnWrapper}>
          <Button
            className={styles.arrowBtn}
            onClick={() => setCurrentDate(customSetMonth(currentDate, -1))}
          >
            <span>
              <SVG width="100%" height="100%" src="/assets/svg/ArrowBack.svg" />
            </span>
          </Button>
          <Button
            className={styles.arrowBtn}
            onClick={() => setCurrentDate(customSetMonth(currentDate, 1))}
          >
            <span>
              <SVG
                width="100%"
                height="100%"
                src="/assets/svg/ArrowForward.svg"
              />
            </span>
          </Button>
          <div className={styles.currentMonth}>
            {EMonth[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
        </div>
      </div>
      <div className={styles.weeksHeader}>
        {days.map((el) => (
          <div key={el} className={styles.dayName}>
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;

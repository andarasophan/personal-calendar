import React, { useContext } from 'react';
import { EMonth } from '../../utils/enums/EMonth';
import { getBpNumber } from '../../utils/helpers/BreakpointHelpers';
import { customSetMonth } from '../../utils/helpers/DateHelpers';
import Button from '../Button';
import SVG from '../SVG';
import styles from './calendar.module.scss';
import { CalendarContext } from './context';
import variables from '../../styles/_variables.scss';
import useWindowSize from '../../hooks/useWindowSize';
import { EDays } from '../../utils/enums/EDays';
import MainButton from '../templates/MainButton';

const CalendarHeader = ({ onChangeMonth }) => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);
  const { width } = useWindowSize();

  const handleOnChange = (value) => {
    setCurrentDate(value);
    if (typeof onChangeMonth === 'function') onChangeMonth(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.control}>
        <MainButton
          className="mr-8"
          color="white"
          size="md"
          onClick={() => handleOnChange(new Date())}
        >
          Today
        </MainButton>
        <div className={styles.monthControl}>
          <div className={styles.btnWrapper}>
            <Button
              className={styles.arrowBtn}
              onClick={() => handleOnChange(customSetMonth(currentDate, -1))}
            >
              <span>
                <SVG
                  width="100%"
                  height="100%"
                  src="/assets/svg/ArrowBack.svg"
                />
              </span>
            </Button>
            <Button
              className={styles.arrowBtn}
              onClick={() => handleOnChange(customSetMonth(currentDate, 1))}
            >
              <span>
                <SVG
                  width="100%"
                  height="100%"
                  src="/assets/svg/ArrowForward.svg"
                />
              </span>
            </Button>
          </div>
          <div className={styles.currentMonth}>
            {EMonth[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
        </div>
      </div>
      <div className={styles.weeksHeader}>
        {Object.keys(EDays).map((el) => (
          <div key={EDays[el]} className={styles.dayName}>
            {width >= getBpNumber(variables.lg) ? EDays[el] : EDays[el][0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;

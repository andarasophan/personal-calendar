import React, { useMemo } from 'react';
import SVG from '../../components/SVG';
import { customDateFormat } from '../../utils/helpers/DateHelpers';
import Footer from '../templates/Footer';
import Header from '../templates/Header';
import styles from './list.module.scss';
import uniqid from 'uniqid';
import { darkColorGenerator } from '../../utils/helpers/ColorHelpers';
import { EMonth } from '../../utils/enums/EMonth';
import { EDays } from '../../utils/enums/EDays';
import Event from './Event';

const List = ({ selectedDate, onAddEvent, events, onClose }) => {
  const eventOnDay = useMemo(
    () => events?.[customDateFormat(selectedDate)] ?? [],
    [events, selectedDate]
  );

  const generateUniqColor = (dep = []) => {
    const result = darkColorGenerator();
    if (dep.some(({ color }) => color === result)) generateUniqColor();
    return result;
  };

  const addEvent = () => {
    // only 3 events are allowed
    if (eventOnDay.length >= 3) return;

    onAddEvent(customDateFormat(selectedDate), {
      id: uniqid(),
      name: 'test asdast sdasfq 12312312dasdasd',
      color: generateUniqColor(eventOnDay),
      time: '11.00 - 14.00',
      invitees: ['andara@mail.com', 'diogojota@mail.com'],
    });
  };

  return (
    <>
      <Header onClose={onClose} />
      <div className={styles.listRoot}>
        <div className={styles.listTitle}>
          <span>
            <SVG width="100%" height="100%" src="/assets/svg/Calendar.svg" />
          </span>
          <p>
            {`${EDays[selectedDate.getDay()]}, ${
              EMonth[selectedDate.getMonth()]
            } ${selectedDate.getDate()}`}
          </p>
        </div>
        <div className={styles.listWrapper}>
          {!eventOnDay.length ? (
            <div className={styles.empty}>No event yet</div>
          ) : (
            eventOnDay.map((el) => (
              <Event
                key={el.id}
                name={el.name}
                time={el.time}
                color={el.color}
                invitees={el.invitees}
              />
            ))
          )}
        </div>
      </div>
      <Footer
        buttonTitle="Add Event"
        onClick={addEvent}
        buttonProps={{ disabled: eventOnDay.length >= 3 }}
      />
    </>
  );
};

export default List;

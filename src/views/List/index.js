import React from 'react';
import SVG from '../../components/SVG';
import Footer from '../templates/Footer';
import Header from '../templates/Header';
import styles from './list.module.scss';
import { EMonth } from '../../utils/enums/EMonth';
import { EDays } from '../../utils/enums/EDays';
import Event from './Event';

const List = ({ selectedDate, events, onClose, onClickFooter }) => {
  return (
    <div className={styles.listRoot}>
      <Header onClose={onClose} />
      <div className={styles.listContent}>
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
          {!events.length ? (
            <div className={styles.empty}>No event yet</div>
          ) : (
            events.map((el) => (
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
        onClick={onClickFooter}
        buttonProps={{ disabled: events.length >= 3 }}
      />
    </div>
  );
};

export default List;

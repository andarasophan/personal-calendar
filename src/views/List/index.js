import React from 'react';
import SVG from '../../components/SVG';
import Footer from '../templates/Footer';
import Header from '../templates/Header';
import styles from './list.module.scss';
import { EMonth } from '../../utils/enums/EMonth';
import { EDays } from '../../utils/enums/EDays';
import Event from './Event';
import { customDateFormat } from '../../utils/helpers/DateHelpers';

const List = ({
  selectedDate,
  events,
  onClose,
  onClickFooter,
  onDeleteEvent,
}) => {
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
            events.map(({ id, name, time, color, invitees }) => (
              <Event
                key={id}
                name={name}
                time={time}
                color={color}
                invitees={invitees}
                onEventClick={() => console.log('event clicked')}
                onDeleteClick={() =>
                  onDeleteEvent(customDateFormat(selectedDate), id)
                }
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

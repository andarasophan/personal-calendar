import React from 'react';
import SVG from '../../components/SVG';
import Footer from '../templates/Footer';
import Header from '../templates/Header';
import styles from './list.module.scss';
import { EMonth } from '../../utils/enums/EMonth';
import { EDays } from '../../utils/enums/EDays';
import Event from './Event';
import { customDateFormat } from '../../utils/helpers/DateHelpers';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

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
        <TransitionGroup className={styles.listWrapper}>
          {events.map(({ id, name, time, color, invitees }) => (
            <CSSTransition
              key={id}
              timeout={200}
              classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exitActive: styles.exitActive,
              }}
              onExited={() => {
                if (events.length <= 1) onClose();
              }}
            >
              <Event
                name={name}
                time={time}
                color={color}
                invitees={invitees}
                onEventClick={() => console.log('event clicked')}
                onDeleteClick={() =>
                  onDeleteEvent(customDateFormat(selectedDate), id)
                }
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
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

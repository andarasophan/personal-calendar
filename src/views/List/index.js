import React, { useMemo, useContext } from 'react';
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
import { store } from '../../store/store';
import {
  DELETE_EVENT,
  SET_MODAL,
  SET_SELECTED_EVENT,
  SET_STEP,
} from '../../store/actionTypes';
import Content from '../templates/Content';
import Card from '../templates/Card';

const List = () => {
  const {
    state: { events, selectedDate },
    dispatch,
  } = useContext(store);

  const eventsOnDate = useMemo(() => {
    if (!selectedDate) return [];
    return events?.[customDateFormat(selectedDate)] ?? [];
  }, [events, selectedDate]);

  const handleOnClose = () => dispatch({ type: SET_MODAL, payload: false });

  const handleDeleteEvent = (id) => {
    dispatch({
      type: DELETE_EVENT,
      key: id,
      formattedDate: customDateFormat(selectedDate),
    });
  };

  const handleFooterClick = () => dispatch({ type: SET_STEP, payload: 1 });

  return (
    <Card>
      <Header onClose={handleOnClose} />
      <Content>
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
          {eventsOnDate.map((event) => {
            const { id, name, from, to, color, invitees } = event;
            return (
              <CSSTransition
                key={id}
                timeout={200}
                classNames={{
                  enter: styles.enter,
                  enterActive: styles.enterActive,
                  exitActive: styles.exitActive,
                }}
                onExited={() => {
                  if (eventsOnDate.length <= 1) handleOnClose();
                }}
              >
                <Event
                  name={name}
                  time={`${from} - ${to}`}
                  color={color}
                  invitees={invitees}
                  onEventClick={() => {
                    // TODO handle all of these on middleware
                    dispatch({ type: SET_SELECTED_EVENT, payload: event });
                    dispatch({
                      type: SET_STEP,
                      payload: 2,
                    });
                  }}
                  onDeleteClick={() => handleDeleteEvent(id)}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </Content>
      <Footer
        buttonTitle="Add Event"
        onClick={handleFooterClick}
        buttonProps={{ disabled: eventsOnDate.length >= 3 }}
      />
    </Card>
  );
};

export default List;

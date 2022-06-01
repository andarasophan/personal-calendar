import React, { useMemo, useContext } from 'react';
import { darkColorGenerator } from '../../utils/helpers/ColorHelpers';
import { customDateFormat } from '../../utils/helpers/DateHelpers';
import uniqid from 'uniqid';
import styles from './add.module.scss';
import Header from '../templates/Header';
import Footer from '../templates/Footer';
import { store } from '../../store/store';
import { ADD_EVENT, SET_MODAL, SET_STEP } from '../../store/actionTypes';

const generateUniqColor = (dep = []) => {
  const result = darkColorGenerator();
  if (dep.some(({ color }) => color === result)) generateUniqColor();
  return result;
};

const Add = () => {
  const {
    state: { events, selectedDate },
    dispatch,
  } = useContext(store);

  const eventsOnDate = useMemo(() => {
    if (!selectedDate) return [];
    return events?.[customDateFormat(selectedDate)] ?? [];
  }, [events, selectedDate]);

  const addEvent = () => {
    // only 3 events are allowed
    if (eventsOnDate.length >= 3) return;

    dispatch({
      type: ADD_EVENT,
      formattedDate: customDateFormat(selectedDate),
      payload: {
        id: uniqid(),
        name: 'test asdast sdasfq 12312312dasdasd',
        color: generateUniqColor(eventsOnDate),
        time: '11.00 - 14.00',
        invitees: ['andara@mail.com', 'diogojota@mail.com'],
      },
    });
    // TODO handle on middleware SET STEP
    dispatch({ type: SET_STEP, payload: 0 });
  };

  const handleOnClose = () => dispatch({ type: SET_MODAL, payload: false });
  const handleOnBack = () => dispatch({ type: SET_STEP, payload: 0 });

  return (
    <div className={styles.addRoot}>
      <Header
        onClose={handleOnClose}
        onBack={handleOnBack}
        backButtonProps={{ disabled: !eventsOnDate.length }}
      />
      <p style={{ padding: '5rem', textAlign: 'center' }}>
        this will be the form
      </p>
      <Footer buttonTitle="Save" onClick={addEvent} />
    </div>
  );
};

export default Add;

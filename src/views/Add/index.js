import React from 'react';
import { darkColorGenerator } from '../../utils/helpers/ColorHelpers';
import { customDateFormat } from '../../utils/helpers/DateHelpers';
import uniqid from 'uniqid';
import styles from './add.module.scss';
import Header from '../templates/Header';
import Footer from '../templates/Footer';

const Add = ({
  events,
  selectedDate,
  onAddEvent,
  onClose,
  onBack,
  onSuccess,
}) => {
  const generateUniqColor = (dep = []) => {
    const result = darkColorGenerator();
    if (dep.some(({ color }) => color === result)) generateUniqColor();
    return result;
  };

  const addEvent = () => {
    // only 3 events are allowed
    if (events.length >= 3) return;

    onAddEvent(customDateFormat(selectedDate), {
      id: uniqid(),
      name: 'test asdast sdasfq 12312312dasdasd',
      color: generateUniqColor(events),
      time: '11.00 - 14.00',
      invitees: ['andara@mail.com', 'diogojota@mail.com'],
    });

    onSuccess();
  };

  return (
    <div className={styles.addRoot}>
      <Header
        onClose={onClose}
        onBack={onBack}
        backButtonProps={{ disabled: !events.length }}
      />
      <p style={{ padding: '5rem', textAlign: 'center' }}>
        this will be the form
      </p>
      <Footer buttonTitle="Save" onClick={addEvent} />
    </div>
  );
};

export default Add;

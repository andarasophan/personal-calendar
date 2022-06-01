import React, { useState, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { SwitchTransition } from 'react-transition-group';
import { customDateFormat } from '../utils/helpers/DateHelpers';
import Add from './Add';
import List from './List';
import styles from './views.module.scss';

const Views = ({
  events: allEvents,
  selectedDate,
  onAddEvent,
  onClose,
  onDeleteEvent,
}) => {
  const [step, setStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);

  const eventOnDay = useMemo(
    () => allEvents?.[customDateFormat(selectedDate)] ?? [],
    [allEvents, selectedDate]
  );

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        timeout={200}
        key={step}
        classNames={{
          enter:
            step > previousStep
              ? styles.enterSlideBackward
              : styles.enterSlideForward,
          enterActive: styles.enterActive,
          exitActive:
            step > previousStep
              ? styles.exitSlideBackward
              : styles.exitSlideForward,
        }}
        onExited={() => setPreviousStep(step)}
      >
        {step === 0 ? (
          <List
            onClose={onClose}
            events={eventOnDay}
            selectedDate={selectedDate}
            onClickFooter={() => setStep(1)}
            onDeleteEvent={onDeleteEvent}
          />
        ) : (
          <Add
            onClose={onClose}
            onBack={() => setStep(0)}
            events={eventOnDay}
            selectedDate={selectedDate}
            onAddEvent={onAddEvent}
            onSuccess={() => onClose()}
          />
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Views;

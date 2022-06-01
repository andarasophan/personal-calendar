import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { SwitchTransition } from 'react-transition-group';
import Add from './Add';
import List from './List';
import styles from './views.module.scss';

const Views = ({
  step,
  setStep,
  events,
  selectedDate,
  onAddEvent,
  onClose,
  onDeleteEvent,
}) => {
  const [previousStep, setPreviousStep] = useState(0);

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
            events={events}
            selectedDate={selectedDate}
            onClickFooter={() => setStep(1)}
            onDeleteEvent={onDeleteEvent}
          />
        ) : (
          <Add
            onClose={onClose}
            onBack={() => setStep(0)}
            events={events}
            selectedDate={selectedDate}
            onAddEvent={onAddEvent}
            onSuccess={() => setStep(0)}
          />
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Views;

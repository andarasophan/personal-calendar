import React, { useState, useContext, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { SwitchTransition } from 'react-transition-group';
import { store } from '../store/store';
import Add from './Add';
import Edit from './Edit';
import List from './List';
import styles from './views.module.scss';

const Views = () => {
  const {
    state: { step },
  } = useContext(store);
  const [previousStep, setPreviousStep] = useState(0);

  const renderView = useMemo(() => {
    /**
     * step
     * 0 => list
     * 1 => add
     * 2 => edit
     */
    if (step === 2) return <Edit />;
    if (step === 1) return <Add />;
    return <List />;
  }, [step]);

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
        {renderView}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Views;

import React, { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import { ENTERED } from 'react-transition-group/cjs/Transition';
import styles from './modal.module.scss';

const Modal = ({ children, onClose, open, duration = 200 }) => {
  const nodeRef = useRef();

  const handleClose = useCallback(() => {
    if (typeof onClose === 'function') onClose();
  }, [onClose]);

  return ReactDOM.createPortal(
    <Transition
      nodeRef={nodeRef}
      in={open}
      timeout={{
        enter: 10,
        exit: duration,
      }}
      unmountOnExit
    >
      {(state) => (
        <div ref={nodeRef} className={styles.modalRoot}>
          <div className={styles.cardContainer}>
            <div
              className={styles.card}
              style={{
                transform: state === ENTERED ? 'scale(1)' : 'scale(0)',
                transition: `transform ${duration}ms ease-in-out`,
              }}
            >
              {children}
            </div>
          </div>
          <div
            className={styles.overlay}
            style={{
              opacity: state === ENTERED ? 0.1 : 0,
              transition: `opacity ${duration}ms ease-in-out`,
            }}
            onClick={handleClose}
          />
        </div>
      )}
    </Transition>,
    document.body
  );
};

export default Modal;

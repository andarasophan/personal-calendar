import React, { useContext, useState, useMemo } from 'react';
import { usePopper } from 'react-popper';
import Calendar from './components/Calendar';
import Modal from './components/Modal';
import useWindowSize from './hooks/useWindowSize';
import { SET_MODAL, SET_SELECTED_DATE, SET_STEP } from './store/actionTypes';
import { store } from './store/store';
import { customDateFormat } from './utils/helpers/DateHelpers';
import Views from './views';
import variables from './styles/_variables.scss';
import { getBpNumber } from './utils/helpers/BreakpointHelpers';

function App() {
  const {
    state: { events, openModal },
    dispatch,
  } = useContext(store);

  const { width } = useWindowSize();
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'right-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 16],
          },
        },
      ],
    }
  );

  const modalCardProps = useMemo(() => {
    if (width >= getBpNumber(variables.md))
      return {
        style: popperStyles.popper,
        ...attributes.popper,
      };
  }, [width, popperStyles.popper, attributes.popper]);

  return (
    <div className="container">
      <Calendar
        events={events}
        onClickDay={(date, event) => {
          setReferenceElement(event.target);
          // TODO handle all of these on middleware
          dispatch({ type: SET_SELECTED_DATE, payload: date });
          dispatch({
            type: SET_STEP,
            payload: !events?.[customDateFormat(date)]?.length ? 1 : 0,
          });
          dispatch({ type: SET_MODAL, payload: true });
        }}
        onChangeMonth={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }}
      />
      <Modal
        ref={setPopperElement}
        open={openModal}
        cardProps={modalCardProps}
        onClose={() => dispatch({ type: SET_MODAL, payload: false })}
      >
        <Views />
      </Modal>
    </div>
  );
}

export default App;

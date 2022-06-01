import React, { useContext } from 'react';
import Calendar from './components/Calendar';
import Modal from './components/Modal';
import { SET_MODAL, SET_SELECTED_DATE, SET_STEP } from './store/actionTypes';
import { store } from './store/store';
import { customDateFormat } from './utils/helpers/DateHelpers';
import Views from './views';

function App() {
  const {
    state: { events, openModal },
    dispatch,
  } = useContext(store);

  return (
    <div className="container">
      <Calendar
        events={events}
        onClickDay={(date) => {
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
        open={openModal}
        onClose={() => dispatch({ type: SET_MODAL, payload: false })}
      >
        <Views />
      </Modal>
    </div>
  );
}

export default App;

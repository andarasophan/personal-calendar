import React, { useContext } from 'react';
import styles from './edit.module.scss';
import Header from '../templates/Header';
import Footer from '../templates/Footer';
import { store } from '../../store/store';
import { EDIT_EVENT, SET_MODAL, SET_STEP } from '../../store/actionTypes';
import Form from '../templates/Form';
import { customDateFormat } from '../../utils/helpers/DateHelpers';

const FormID = 'editEvent';

const Edit = () => {
  const {
    state: { selectedDate, selectedEvent },
    dispatch,
  } = useContext(store);

  const handleOnSubmit = ({ name, invitees }) => {
    // TODO handle on middleware
    dispatch({
      type: EDIT_EVENT,
      key: selectedEvent.id,
      formattedDate: customDateFormat(selectedDate),
      payload: {
        id: selectedEvent.id,
        name,
        color: selectedEvent.color,
        // TODO handle time
        time: '11.00 - 14.00',
        invitees,
      },
    });
    dispatch({ type: SET_STEP, payload: 0 });
  };

  const handleOnClose = () => dispatch({ type: SET_MODAL, payload: false });
  const handleOnBack = () => dispatch({ type: SET_STEP, payload: 0 });

  return (
    <div className={styles.editRoot}>
      <Header onClose={handleOnClose} onBack={handleOnBack} />
      <div className={styles.editContent}>
        <Form
          onSubmit={handleOnSubmit}
          formId={FormID}
          selectedDate={selectedDate}
          defaultValues={selectedEvent}
        />
      </div>
      <Footer
        buttonTitle="Edit"
        buttonProps={{
          form: FormID,
          type: 'submit',
        }}
      />
    </div>
  );
};

export default Edit;

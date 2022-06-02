import React, { useContext, useMemo } from 'react';
import Header from '../templates/Header';
import Footer from '../templates/Footer';
import { store } from '../../store/store';
import {
  DELETE_EVENT,
  EDIT_EVENT,
  SET_MODAL,
  SET_STEP,
} from '../../store/actionTypes';
import Form from '../templates/Form';
import { customDateFormat } from '../../utils/helpers/DateHelpers';
import Content from '../templates/Content';
import Card from '../templates/Card';
import MainButton from '../../components/templates/MainButton';

const FormID = 'editEvent';

const Edit = () => {
  const {
    state: { selectedDate, selectedEvent, events },
    dispatch,
  } = useContext(store);

  const eventsOnDate = useMemo(() => {
    if (!selectedDate) return [];
    return events?.[customDateFormat(selectedDate)] ?? [];
  }, [events, selectedDate]);

  const handleOnSubmit = ({ name, invitees, from, to }) => {
    // TODO handle on middleware
    dispatch({
      type: EDIT_EVENT,
      key: selectedEvent.id,
      formattedDate: customDateFormat(selectedDate),
      payload: {
        id: selectedEvent.id,
        name,
        color: selectedEvent.color,
        from,
        to,
        invitees,
      },
    });
    dispatch({ type: SET_STEP, payload: 0 });
  };

  const handleOnClose = () => dispatch({ type: SET_MODAL, payload: false });
  const handleOnBack = () => dispatch({ type: SET_STEP, payload: 0 });

  const handleDeleteEvent = () => {
    // TODO handle on middleware
    dispatch({
      type: DELETE_EVENT,
      key: selectedEvent.id,
      formattedDate: customDateFormat(selectedDate),
    });
    if (eventsOnDate.length <= 1) dispatch({ type: SET_MODAL, payload: false });
    else dispatch({ type: SET_STEP, payload: 0 });
  };

  return (
    <Card>
      <Header onClose={handleOnClose} onBack={handleOnBack} />
      <Content>
        <Form
          onSubmit={handleOnSubmit}
          formId={FormID}
          selectedDate={selectedDate}
          defaultValues={selectedEvent}
        />
      </Content>
      <Footer
        buttonTitle="Edit"
        buttonProps={{
          form: FormID,
          type: 'submit',
        }}
        otherComponent={
          <MainButton
            className="mr-4"
            color="red"
            type="button"
            onClick={handleDeleteEvent}
          >
            Delete
          </MainButton>
        }
      />
    </Card>
  );
};

export default Edit;

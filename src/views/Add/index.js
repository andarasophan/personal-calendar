import React, { useMemo, useContext } from 'react';
import { darkColorGenerator } from '../../utils/helpers/ColorHelpers';
import { customDateFormat } from '../../utils/helpers/DateHelpers';
import uniqid from 'uniqid';
import Header from '../templates/Header';
import Footer from '../templates/Footer';
import { store } from '../../store/store';
import { ADD_EVENT, SET_MODAL, SET_STEP } from '../../store/actionTypes';
import Form from '../templates/Form';
import Content from '../templates/Content';
import Card from '../templates/Card';

const generateUniqColor = (dep = []) => {
  const result = darkColorGenerator();
  if (dep.some(({ color }) => color === result)) generateUniqColor();
  return result;
};

const FormID = 'createEvent';

const Add = () => {
  const {
    state: { events, selectedDate },
    dispatch,
  } = useContext(store);

  const eventsOnDate = useMemo(() => {
    if (!selectedDate) return [];
    return events?.[customDateFormat(selectedDate)] ?? [];
  }, [events, selectedDate]);

  const handleOnSubmit = ({ name, invitees, from, to }) => {
    // only 3 events are allowed
    if (eventsOnDate.length >= 3) return;

    // TODO handle on middleware
    dispatch({
      type: ADD_EVENT,
      formattedDate: customDateFormat(selectedDate),
      payload: {
        id: uniqid(),
        name,
        color: generateUniqColor(eventsOnDate),
        from,
        to,
        invitees,
      },
    });
    dispatch({ type: SET_STEP, payload: 0 });
  };

  const handleOnClose = () => dispatch({ type: SET_MODAL, payload: false });
  const handleOnBack = () => dispatch({ type: SET_STEP, payload: 0 });

  return (
    <Card>
      <Header
        onClose={handleOnClose}
        onBack={handleOnBack}
        backButtonProps={{ disabled: !eventsOnDate.length }}
      />
      <Content>
        <Form
          onSubmit={handleOnSubmit}
          formId={FormID}
          selectedDate={selectedDate}
        />
      </Content>
      <Footer
        buttonTitle="Save"
        buttonProps={{
          form: FormID,
          type: 'submit',
        }}
      />
    </Card>
  );
};

export default Add;

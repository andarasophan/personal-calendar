import React, { createContext, useEffect, useReducer } from 'react';
import {
  getLocalStorage,
  saveLocalStorage,
} from '../utils/helpers/StorageHelpers';
import { reducer } from './reducer';

const initialState = {
  events: getLocalStorage('events'),
  step: 0,
  openModal: false,
  selectedDate: null,
  selectedEvent: null,
};

const store = createContext(initialState);
const { Provider } = store;

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // only watch state `events`
  // save state `events` to localstorage to make it persisting
  useEffect(() => {
    saveLocalStorage('events', state.events);
  }, [state.events]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StoreProvider };

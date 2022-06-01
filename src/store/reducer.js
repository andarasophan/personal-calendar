import {
  ADD_EVENT,
  DELETE_EVENT,
  SET_MODAL,
  SET_SELECTED_DATE,
  SET_STEP,
} from './actionTypes';

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.formattedDate]: [
            ...(state.events?.[action.formattedDate] ?? []),
            action.payload,
          ],
        },
      };
    case DELETE_EVENT:
      const current = state.events?.[action.formattedDate] ?? [];
      return {
        ...state,
        events: {
          ...state.events,
          [action.formattedDate]: current.filter((el) => el.id !== action.key),
        },
      };
    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case SET_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    default:
      throw new Error();
  }
};

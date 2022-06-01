import {
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  SET_MODAL,
  SET_SELECTED_DATE,
  SET_SELECTED_EVENT,
  SET_STEP,
} from './actionTypes';

export const reducer = (state, action) => {
  const currentEventOnDate = state.events?.[action.formattedDate] ?? [];

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
      return {
        ...state,
        events: {
          ...state.events,
          [action.formattedDate]: currentEventOnDate.filter(
            (el) => el.id !== action.key
          ),
        },
      };
    case EDIT_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.formattedDate]: currentEventOnDate.map((el) =>
            el.id === action.key ? action.payload : el
          ),
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
    case SET_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      };
    default:
      throw new Error();
  }
};

import { v4 as generateId } from "uuid";

// Alert Reducer
export const SET_ALERT = "APP/SET_ALERT";
export const REMOVE_ALERT = "APP/REMOVE_ALERT";

const initialState = [];
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = generateId();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 1000);
};

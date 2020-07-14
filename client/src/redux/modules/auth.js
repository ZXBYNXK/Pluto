import axios from "axios";
import { setAlert } from "./alert";
import { connect } from "mongoose";
export const REGISTER_SUCCESS = "APP/AUTH/REGISTER_SUCCESS";
export const REGISTER_FAIL = "APP/AUTH/REGISTER_FAIL";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
        console.log(12, payload)
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export const register = ({email, name, password}) => async (dispatch) => {
  const body = JSON.stringify({email, name, password});
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

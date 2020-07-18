// REDUCER FILE

// Modules
import axios from "axios";

// External Files
import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "./alert";

// Action Types
import { CLEAR_PROFILE } from "./profile";
export const REGISTER_SUCCESS = "PLUTO/AUTH/REGISTER_SUCCESS";
export const REGISTER_FAIL = "PLUTO/AUTH/REGISTER_FAIL";
export const LOGIN_SUCCESS = "PLUTO/AUTH/LOGIN_SUCCESS";
export const LOGIN_FAIL = "PLUTO/AUTH/LOGIN_FAIL";
export const USER_LOADED = "PLUTO/AUTH/USER_LOADED";
export const AUTH_ERROR = "PLUTO/AUTH/ERROR";
export const LOGOUT = "PLUTO/AUTH/LOGOUT";

// Reducer
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
      console.log("User loaded: { User : ", payload, "}")
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload);
      console.log("Register Sucess: { Token : ", payload, "}")
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
            console.log("Logouy: { LocalStorage : { Token: ", payload, "} }");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};

// - Action creators
export const register = ({ email, name, password }) => async (dispatch) => {
  const body = JSON.stringify({ email, name, password });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: USER_LOADED,
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

export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    setAuthToken(res.data)
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  setAuthToken(false);
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    console.log("Loaduser() { res:", res.data, "}");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

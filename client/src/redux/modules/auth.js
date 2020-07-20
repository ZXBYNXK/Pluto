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
export const ACCOUNT_DELETED = "PLUTO/AUTH/ACCOUNT_DELETED";

// Reducer
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case AUTH_ERROR:
    case LOGOUT:
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
}

// - Action creators
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
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

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const body = {email, password};
  try {
    const res = await axios.post("/api/auth", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // @bug Attempting to fix token not being set to global headers.
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



import api from "../../utils/api";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";

// Action Types
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
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};

// Action Creators
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");
    console.log(res.data)
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

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token: res.data },
    });

    setAuthToken(res.data);
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert("Invalid input.", "danger"));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await api.post("/auth", { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: res.data },
    });
    setAuthToken(res.data);
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert("Invalid input.", "danger"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => dispatch({ type: LOGOUT });

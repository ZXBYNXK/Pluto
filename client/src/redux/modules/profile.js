// REDUCER FILE

// Modules
import axios from "axios";

// Ext Action Creators
import { setAlert } from "./alert";

// Action types
export const GET_PROFILE = "PLUTO/PROFILES/GET_PROFILE";
export const PROFILE_ERROR = "PLUTO/PROFILES/PROFILE_ERROR";
export const CLEAR_PROFILE = "PLUTO/PROFILES/CLEAR_PROFILE";
export const UPDATE_PROFILE = "PLUTO/PROFILES/UPDATE_PROFILE"

// Reducer
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Action Creators
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profiles/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profiles", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profiles/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Expeirence added', 'success'));
    
      history.push('/dashboard');
    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profiles/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education added', 'success'));
    
      history.push('/dashboard');
    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
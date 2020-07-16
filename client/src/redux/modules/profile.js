// REDUCER FILE

// Modules
import axios from "axios";

// Ext Action Creators
import { setAlert } from "./alert";

// Action types
export const GET_PROFILE = "PLUTO/PROFILES/GET_PROFILE";
export const PROFILE_ERROR = "PLUTO/PROFILES/PROFILE_ERROR";
export const CLEAR_PROFILE = "PLUTO/PROFILES/CLEAR_PROFILE";

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

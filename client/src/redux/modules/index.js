import { combineReducers } from 'redux';
import {default as alert} from './alert';
import {default as auth} from './auth';
import {default as profile} from './profile';
import post from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  post
});
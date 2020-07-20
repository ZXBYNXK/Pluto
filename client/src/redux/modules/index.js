import { combineReducers } from 'redux';
import {default as alert} from './alert';
import {default as auth} from './auth';
import {default as profile} from './profile';
import {default as post} from './post';
console.log(22, auth)
export default combineReducers({
  alert,
  auth,
  profile,
  post
});
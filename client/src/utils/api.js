import axios from 'axios';
// import store from '../redux';
// import { LOGOUT } from "../redux/modules/auth";

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': "*"
  }
});

// api.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response.data.msg === 'Token is not valid') {
//       store.dispatch({ type: LOGOUT });
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
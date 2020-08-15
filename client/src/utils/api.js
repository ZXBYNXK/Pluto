import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.API_ROOT}/api`,
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
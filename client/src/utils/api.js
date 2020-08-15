import axios from 'axios';

const api = axios.create({
  baseURL: `https://pluto-back-end.ue.r.appspot.com/api`,
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': "*"
  }
});

export default api;
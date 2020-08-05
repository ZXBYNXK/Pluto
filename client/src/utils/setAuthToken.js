import api from "../utils/api";


export default (token) => {
  if (token) {
    console.log(1, api.defaults.headers.common["x-auth-token"]);
    api.defaults.headers.common["x-auth-token"] = token;
    console.log(2, api.defaults.headers.common["x-auth-token"]);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
  }
};

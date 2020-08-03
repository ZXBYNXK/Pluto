import axios from "axios";
export default (token) => {
  if (token) {
    console.log(1, axios.defaults.headers.common["x-auth-token"]);
    axios.defaults.headers.common["x-auth-token"] = token;
    console.log(2, axios.defaults.headers.common["x-auth-token"]);
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

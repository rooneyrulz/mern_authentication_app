import Axios from "axios";

export default (token) => {
  if (token) {
    //If there is valid token then set headers
    Axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete Axios.defaults.headers.common['Authorization'];
  }
}
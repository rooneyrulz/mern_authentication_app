import Axios from "axios";
import { 
  GET_DASHBOARD, 
  POST_USER, 
  SET_CURRENT_USER, 
  CLEAR_CURRENT_USER,
  GET_ERROR, 
} from "./types";

import setAuthToken from "../utils/setAuthToken";

export const postUser = (user, history) => dispatch => {
  Axios
    .post(`/user/register`, user)
    .then(res => {
      history.push('/login');
      dispatch({
        type: POST_USER,
        payload: res.data
      });
    })
    .catch(err => {
      const error = err;
      dispatch({
        type: GET_ERROR,
        payload: error
      });
    });
}

export const authenticateUser = (user, history) => dispatch => {
  Axios
    .post(`/user/authenticate`, user)
    .then(res => {
      //Grab the token from response data
      let { token, user } = res.data;

      //Store the token on local storage
      localStorage.setItem('access_token', token);

      //Store the current user on local storage
      localStorage.setItem('user', JSON.stringify(user));

      //Set the token to the auth header
      setAuthToken(token);

      //Send current user
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });

      history.push('/dashboard');

    })
    .catch(err => {
      const error = err;
      dispatch({
        type: GET_ERROR,
        payload: error
      });
    });
}

export const getDashboard = () => dispatch => {
  Axios
    .get(`/user/dashboard`)
    .then(res => dispatch({
      type: GET_DASHBOARD,
      payload: res.data
    }))
    .catch(err => {
      const error = err;
      dispatch({
        type: GET_ERROR,
        payload: error
      });
    });
}

export const logOutUser = (history) => dispatch => {
  //Clear User & Token from the storage
  localStorage.clear();

  //Unset headers
  setAuthToken(false);

  dispatch({
    type: CLEAR_CURRENT_USER,
    payload: {}
  });

  history.push('/');
}
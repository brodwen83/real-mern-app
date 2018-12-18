import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwtDecode from "jwt-decode";

import setAuthToken from "../../utils/setAuthToken";

// const userSignedIn = userData => {
//   return {
//     type: USER_SIGNED_IN,
//     payload: userData
//   };
// };

/**
 * @param {*} errors
 * @description  returns an action with errors object as payload
 */
const getErrors = errors => ({
  type: GET_ERRORS,
  payload: errors
});

// Register user dispatch(userSignedIn(res.data))
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      // dispatch(userSignedIn(res.data));
      history.push("/login");
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// login  - Get User Token
export const loginUser = credentials => dispatch => {
  axios
    .post("/api/users/login", credentials)
    .then(res => {
      // Save token tto localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set Token to headers
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwtDecode(token);

      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};

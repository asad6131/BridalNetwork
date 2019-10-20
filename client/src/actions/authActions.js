import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import socketIOClient from "socket.io-client";

import { GET_ERRORS, SET_CURRENT_USER, ADD_SOCKET } from "./types";

export const connectSocket = () => {
  return dispatch => {
    const socket = socketIOClient('http://bridalnetwork.co');
    // const socket = socketIOClient("http://localhost:3000");
    dispatch({ type: ADD_SOCKET, socket });
  };
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register User
export const registerAdmin = (userData, history) => dispatch => {
  axios
    .post("/api/users/admin_register", userData)
    .then(res => history.push("/vendor/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      // console.log(decoded, " current user");
      dispatch(setCurrentUser(decoded));
      window.location = "/dashboard";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginVendorUser = userData => dispatch => {
  axios
    .post("/api/users/vendorlogin", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      // console.log(decoded, " current user");
      dispatch(setCurrentUser(decoded));
      window.location = "/vendor/dashboard";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginAdminUser = userData => dispatch => {
  axios
    .post("/api/users/adminlogin", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      // console.log(decoded, " current user");
      dispatch(setCurrentUser(decoded));
      window.location = "/admin/dashboard";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location = "/login";
};

export const changePassword = userData => dispatch => {
  axios
    .post("/api/users/changepassword", userData)
    .then(res => {
      window.location = "/change-password";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


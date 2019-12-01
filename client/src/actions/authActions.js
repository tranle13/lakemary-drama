import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  GET_USERS
} from "./types";

// Get User
export const getUser = userData => dispatch => {
  axios
    .get("/api/users/user", userData)
    .then(res => console.log(res)) // Log response. Used for testing
    .catch(err => 
      dispatch({ 
        type: GET_ERRORS, 
        payload: err.response.data
      })
    )
};
// Get All Users
export const getAllUsers = () => dispatch => {
  axios
    .get("/api/users/all-users", {})
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
      return res.data
    }) // Log response. Used for testing
    .catch(err => 
      dispatch({ 
        type: GET_ERRORS, 
        payload: err.response.data
      })
    )
};
// Get Cards
export const getCard = (id) => dispatch => {
  return axios
    .get("/api/cards/:id", id)
    .then(res => { console.log(res) })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Post Card
export const postCard = postData => dispatch => {
  axios
    .post("/api/cards/card", postData)
    .then(res => console.log(res)) // Log response. Used for testing
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = (userData) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
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
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

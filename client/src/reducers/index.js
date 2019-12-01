import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import axiosReducer from "./axiosReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  getUsers: axiosReducer
});

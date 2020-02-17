import _ from "lodash";
import apiConnector from "../apis/apiConnector";

// login user
export const loginUser = user => {
  return {
    type: "LOGIN_USER",
    payload: user
  };
};

// register user
export const registerUser = user => {
  return {
    type: "REGISTER_USER",
    payload: user
  };
};

// logout user
export const logoutUser = user => {
  return {
    type: "LOGOUT_USER",
    payload: user
  };
};

/* memoized --> This function will only be called once. O(n) */
const _listRestaurants = _.memoize(async dispatch => {
  const response = await apiConnector.getAllRestaurants();
  dispatch({ type: "LIST_RESTAURANTS", payload: response });
});
// list all restaurants
export const listRestaurants = () => dispatch => _listRestaurants(dispatch);

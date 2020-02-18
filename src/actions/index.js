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
export const registerUser = registrationInfo => async dispatch => {
  // makes the api call to register
  const registrationResponse = await apiConnector.registerUser(
    registrationInfo
  );
  console.log("registrationResponse:", registrationResponse);
  const userInfo = registrationResponse.data;
  console.log("userInfo:", userInfo);

  if (registrationResponse.status.code === 201) {
    dispatch({
      type: "REGISTER_USER",
      payload: userInfo
    });
  }
};

// logout user
export const logoutUser = user => {
  return {
    type: "LOGOUT_USER",
    payload: user
  };
};

/* memoized --> This function will only be called once. */
const _listRestaurants = _.memoize(async dispatch => {
  const response = await apiConnector.getAllRestaurants();
  dispatch({ type: "LIST_RESTAURANTS", payload: response });
});
// list all restaurants
export const listRestaurants = () => dispatch => _listRestaurants(dispatch);

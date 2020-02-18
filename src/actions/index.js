import _ from "lodash";
import apiConnector from "../apis/apiConnector";


/* memoized */
const _registerUser = _.memoize(async (registrationInfo, dispatch) => {
  const response = await apiConnector.registerUser(registrationInfo);
  console.log("response:", response);
  const userInfo = response.data;

  if (response.status.code === 201)
    dispatch({ type: "REGISTER_USER", payload: userInfo });
});

const _listRestaurants = _.memoize(async dispatch => {
  const response = await apiConnector.getAllRestaurants();
  dispatch({ type: "LIST_RESTAURANTS", payload: response });
});

/* functions being imported that execute */

export const registerUser = registrationInfo => dispatch => 
_registerUser(registrationInfo, dispatch);

export const listRestaurants = () => dispatch => _listRestaurants(dispatch);

export const logoutUser = user => {
  return {
    type: "LOGOUT_USER",
    payload: user
  };
};

export const loginUser = user => {
    

  return {
    type: "LOGIN_USER",
    payload: user
  };
};

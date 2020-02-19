import _ from "lodash";
import apiConnector from "../apis/apiConnector";
import { toast } from "react-toastify";

/* --- memoized functions --- */

const _registerUser = _.memoize(async (registrationInfo, dispatch) => {
  const response = await apiConnector.registerUser(registrationInfo);
  const userInfo = response.data;

  if (response.status.code === 201)
    dispatch({ type: "REGISTER_USER", payload: userInfo });
});

const _fetchSingleRestaurant = _.memoize(
  async (restaurant_api_key, dispatch) => {
    const response = await apiConnector.getIndividualRestaurant(
      restaurant_api_key
    );
    const restaurantResponse = response.restaurant;
    dispatch({
      type: "RECIEVE_SINGLE_RESTAURANT",
      payload: restaurantResponse
    });
  }
);

/* --- functions that execute --- */

export const listRestaurants = () => async dispatch => {
  const response = await apiConnector.getAllRestaurants();
  dispatch({ type: "LIST_RESTAURANTS", payload: response });
};

export const registerUser = registrationInfo => dispatch =>
  _registerUser(registrationInfo, dispatch);

export const fetchSingleRestaurant = restaurant_api_key => async dipatch => {
  _fetchSingleRestaurant(restaurant_api_key, dipatch);
};

export const logoutUser = user => {
  return {
    type: "LOGOUT_USER",
    payload: user
  };
};

// actions for loggin in a user
export const loginUser = loginInfo => async dispatch => {
  const loginResponse = await apiConnector.loginUser(loginInfo);

  // if the user successfully logged in
  if (loginResponse.status.code === 200) {
    dispatch({
      type: "LOGIN_USER",
      payload: loginResponse.data
    });

    // notifies the user with a welcome message
    const toastMessage = "Welcome back, " + loginResponse.data.first_name;
    toast(toastMessage);
  }
  return loginResponse;
};


// action for getting all of the restaurants near a certain delivery address
export const getRestaurantsNearBy = address => async dispatch => {
  const response = await apiConnector.getRestaurantsNearBy(address);
  const foundRestaurants = response.data.restaurants;
  
  dispatch({
    type: "LIST_RESTAURANTS",
    payload: foundRestaurants
  });
}

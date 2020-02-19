import _ from "lodash";
import apiConnector from "../apis/apiConnector";
import { toast } from "react-toastify";

/* ----------------------
    user api calls 
  ----------------------- */

const _registerUser = _.memoize(async (registrationInfo, dispatch) => {
  const response = await apiConnector.registerUser(registrationInfo);
  const userInfo = response.data;

  if (response.status.code === 201)
    dispatch({ type: "REGISTER_USER", payload: userInfo });
});

export const registerUser = registrationInfo => dispatch =>
  _registerUser(registrationInfo, dispatch);

// actions for login in a user
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

export const logoutUser = user => {
  return {
    type: "LOGOUT_USER",
    payload: user
  };
};

/* ----------------------
    restaurant api calls 
  ----------------------- */

export const listRestaurants = () => async dispatch => {
  const response = await apiConnector.getAllRestaurants();
  dispatch({ type: "LIST_RESTAURANTS", payload: response });
};

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

export const fetchSingleRestaurant = restaurant_api_key => async dipatch => {
  _fetchSingleRestaurant(restaurant_api_key, dipatch);
};

const _fetchSingleRestaurantMenu = _.memoize(
  async (restaurant_api_key, dispatch) => {
    const response = await apiConnector.getIndividualRestaurantMenu(
      restaurant_api_key
    );
    const restaurantMenuResponse = response.restaurant;
    dispatch({
      type: "RECIEVE_RESTAURANT_MENU",
      payload: restaurantMenuResponse
    });
  }
);

export const fetchSingleRestaurantMenu = restaurant_api_key => async dispatch => {
  _fetchSingleRestaurantMenu(restaurant_api_key, dispatch);
};

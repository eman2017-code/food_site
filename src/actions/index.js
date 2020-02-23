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

// logs out a user
export const logoutUser = () => async dispatch => {
  const response = await apiConnector.logoutUser();
  dispatch({ type: "LOGOUT_USER" });
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

export const fetchSingleRestaurantMenu = restaurant_api_key => async dispatch => {
  const response = await apiConnector.getIndividualRestaurantMenu(
    restaurant_api_key
  );
  const foundRestaurantMenu = response;
  dispatch({
    type: "RECIEVE_RESTAURANT_MENU",
    payload: foundRestaurantMenu
  });
};

// action for getting all of the restaurants near a certain delivery address
export const getRestaurantsNearBy = address => async dispatch => {
  const response = await apiConnector.getRestaurantsNearBy(address);
  const foundRestaurants = response.data.restaurants;

  dispatch({
    type: "LIST_RESTAURANTS",
    payload: foundRestaurants
  });
};

// action for applying food type filters to filter restaurants
export const setFoodTypeFilter = foodType => dispatch => {
  dispatch({
    type: "SET_FOOD_TYPE_FILTER",
    payload: foodType
  });
};

// action for removing food type filters to filter restaurants
export const removeFoodTypeFilter = foodType => dispatch => {
  dispatch({
    type: "REMOVE_FOOD_TYPE_FILTER",
    payload: foodType
  });
};

/* ----------------------
    cart api calls 
  ----------------------- */

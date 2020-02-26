import _ from "lodash";
import apiConnector from "../apis/apiConnector";
import { toast } from "react-toastify";

/* ----------------------
    user actions/api calls 
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

// action for adding a new delivery address
export const addDeliveryAddress = deliveryAddress => async dispatch => {
  const response = await apiConnector.addDeliveryAddress(deliveryAddress);

  if (response.status.code === 201) {
    dispatch({
      type: "ADD_DELIVERY_ADDRESS",
      payload: response.data
    });
  }
};

// action for getting all of the users delivery addresses
export const getUsersDeliveryAddresses = () => async dispatch => {
  const response = await apiConnector.getUsersDeliveryAddresses();

  dispatch({
    type: "SET_DELIVERY_ADDRESSES",
    payload: response.data
  });
};

// action for editing a delivery address
export const editDeliveryAddress = deliveryAddress => async dispatch => {
  const response = await apiConnector.editDeliveryAddress(deliveryAddress);

  if (response.status.code === 204) {
    dispatch({
      type: "UPDATE_DELIVERY_ADDRESS",
      payload: response.data
    });
  }
};

// action for deleting a delivery address
export const deleteDeliveryAddress = addressId => async dispatch => {
  const response = await apiConnector.deleteDeliveryAddress(addressId);

  if (response.status.code === 204) {
    dispatch({
      type: "DELETE_DELIVERY_ADDRESS",
      payload: addressId
    });
  }
};

// action for getting all of the users favorite foods
export const getUsersFavoriteFoods = () => async dispatch => {
  const response = await apiConnector.getUsersFavoriteFoods();

  if (response.status.code === 200) {
    dispatch({
      type: "SET_FAVORITE_FOODS",
      payload: response.data
    });
  }
};

// action for adding a favorite food item
export const addFavoriteFood = food => async dispatch => {
  const response = await apiConnector.addFavoriteFood(food);

  if (response.status.code === 201) {
    dispatch({
      type: "ADD_FAVORITE_FOOD",
      payload: response.data
    });
  }
};

// action for deleting a favorite food
export const deleteFavoriteFood = food => async dispatch => {
  const response = await apiConnector.deleteFavoriteFood(food.id);

  if (response.status.code === 204) {
    dispatch({
      type: "DELETE_FAVORITE_FOOD",
      payload: food
    });
  }
};

/* ----------------------
    restaurant actions/api calls 
  ----------------------- */

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

// clears all of the food type filters in the store
export const clearFoodTypeFilters = () => dispatch => {
  dispatch({
    type: "CLEAR_ALL_FOOD_TYPE_FILTERS"
  });
};

/* ----------------------
cart actions/api calls 
----------------------- */

export const addToCart = product => dispatch => {
  dispatch({
    type: "ADD_TO_CART",
    payload: product
  });
  toast.success("Item added to cart", {
    position: toast.POSITION.TOP_LEFT
  });
};

export const clearCart = () => dispatch => {
  dispatch({
    type: "CLEAR_CART"
  });
  toast.success("Cleared your Cart", {
    position: toast.POSITION.TOP_LEFT
  });
};

export const removeFromCart = productId => dispatch => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: productId
  });
  toast.success("Item Removed from Cart", {
    position: toast.POSITION.TOP_LEFT
  });
};

// export const updateCartQuantity = (productId, quantity) => dispatch => {
//   return {
//     type: "UPDATE_CART_QUANTITY",
//     payload: {
//       productId,
//       quantity: quantity
//     }
//   };
// };

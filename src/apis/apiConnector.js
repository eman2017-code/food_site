// import axios from "axios";

/* This is where all of the api calls are made to talk to the API */

/* This allows us to switch url for production and testing purposes */
const debug = true;

let apiURL;
if (debug) {
  apiURL = "http://localhost:8000/api/v1/";
} else {
  apiURL = "http://35.222.49.55:8000/api/v1/";
}

export default {
  // register route
  registerUser: async registrationInfo => {
    try {
      const response = await fetch(apiURL + "users/register", {
        method: "POST",
        body: JSON.stringify(registrationInfo),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {}
  },

  // makes an api call to attempt to login a user
  loginUser: async loginInfo => {
    const loginResponse = await fetch(apiURL + "users/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const parsedLoginResponse = await loginResponse.json();
    return parsedLoginResponse;
  },

  // makes an api call to logout user
  logoutUser: async () => {
    try {
      const response = await fetch(apiURL + "users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {}
  },

  // index (restaurants) route
  getAllRestaurants: async () => {
    const response = await fetch(apiURL + "restaurants/");
    const parsedResponse = await response.json();
    return parsedResponse.data;
  },

  // makes api call to get restaurants near a address
  getRestaurantsNearBy: async (address, pickupRadius = 25, searchTerm = "") => {
    const response = await fetch(
      apiURL +
        `restaurants/search?street_address=${address}&pickup_radius=${pickupRadius}&search_term=${searchTerm}`
    );
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  // restaurant show route
  getIndividualRestaurant: async restaurant_api_key => {
    const response = await fetch(apiURL + `restaurants/${restaurant_api_key}`);
    const parsedResponse = await response.json();
    return parsedResponse.data;
  },

  // restaurant menu show route
  getIndividualRestaurantMenu: async restaurant_api_key => {
    const response = await fetch(
      apiURL + `restaurants/${restaurant_api_key}/menu`
    );
    const parsedResponse = await response.json();
    return parsedResponse.data;
  },

  setUserCart: async () => {
    const response = await fetch(apiURL + "carts/");
    const parsedResponse = response.json();
    return parsedResponse;
  }
};

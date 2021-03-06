/* This is where all of the api calls are made to talk to the API */

/* This allows us to switch url for production and testing purposes */
const debug = false;

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
        credentials: "include",
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
      credentials: "include",
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
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {}
  },

  // makes api call to get restaurants near a address
  getRestaurantsNearBy: async (coordinates, pickupRadius = 25, searchTerm = "") => {
    const response = await fetch(
      apiURL + 'elasticsearch/restaurants/nearme?latitude=' + coordinates[0] + 
                                                '&longitude=' + coordinates[1]
    );
    const parsedResponse = await response.json();
    console.log('getRestaurantsNearBy response:', parsedResponse);  

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

  // gets all of the users delivery addresses
  getUsersDeliveryAddresses: async () => {
    const response = await fetch(apiURL + "addresses/", {
      method: "GET",
      credentials: "include"
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  // creates a delivery address for the user
  addDeliveryAddress: async deliveryAddress => {
    const response = await fetch(apiURL + "addresses/", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(deliveryAddress),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  // updates a users delivery address
  editDeliveryAddress: async deliveryAddress => {
    const response = await fetch(apiURL + "addresses/" + deliveryAddress.id, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(deliveryAddress),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  // deletes a users delivery address
  deleteDeliveryAddress: async addressId => {
    const response = await fetch(apiURL + "addresses/" + addressId, {
      method: "DELETE",
      credentials: "include"
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  // gets the users favorite foods
  getUsersFavoriteFoods: async () => {
    const response = await fetch(apiURL + "favorite-foods/", {
      method: "GET",
      credentials: "include"
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  // creates a favorite food for the user
  addFavoriteFood: async food => {
    const response = await fetch(apiURL + "favorite-foods/", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(food),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  // deletes a users favorite food
  deleteFavoriteFood: async foodId => {
    const response = await fetch(apiURL + "favorite-foods/" + foodId, {
      method: "DELETE",
      credentials: "include"
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  }
};

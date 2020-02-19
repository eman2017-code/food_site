// import axios from "axios";

/* This is where all of the api calls are made to talk to the API */

/* This allows us to switch url for production and testing purposes */
// const debug = true;

let apiURL = "http://localhost:8000/api/v1/";
// if (debug) {
//   apiURL = "http://localhost:8000/api/v1/";
// } else {
//   apiURL = "http://35.222.68.3:8000/api/v1/";
// }

export default {

  // register route
  registerUser: async registrationInfo => {
    console.log("registrationInfo:", registrationInfo);
    try {
      const response = await fetch(apiURL + "users/register", {
        method: "POST",
        body: JSON.stringify(registrationInfo),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("response:", response);
      const parsedResponse = await response.json();
      console.log("parsedResponse.data:", parsedResponse.data);
      return parsedResponse;
    } catch (error) {
      console.log("error:", error);
    }
  },

  // makes an api call to attempt to login a user
  loginUser: async loginInfo => {
    console.log('in the login api call');
    const loginResponse = await fetch(apiURL + 'users/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const parsedLoginResponse = await loginResponse.json();
    console.log('login response in apiConnector:', parsedLoginResponse);
    
    return parsedLoginResponse;
  },

  // index (restaurants) route
  getAllRestaurants: async () => {
    const response = await fetch(apiURL + "restaurants/");
    const parsedResponse = await response.json();
    return parsedResponse.data;
  }
};

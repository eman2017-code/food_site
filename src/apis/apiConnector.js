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
  // login route
  // index route (restaurants)
  getAllRestaurants: async () => {
    const response = await fetch(apiURL + "restaurants/");
    const parsedResponse = await response.json();
    return parsedResponse.data;
  }
};

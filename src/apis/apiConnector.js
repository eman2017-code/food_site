import { listRestaurants } from "../actions";

/* This is where all of the api calls are made to talk to the API */

/* This allows us to switch url for production and testing purposes */
const debug = false;
let apiURL;
if (debug) {
  apiURL = "http://localhost:8000/api/v1/";
} else {
  apiURL = "http://35.222.68.3:8000/api/v1/";
}

export default {
  // register route
  // login route
  // index route (restaurants)
  getAllRestaurants: async responseBack => {
    const response = fetch(apiURL + "restaurants/");
    const parsedResponse = (await response).json();
    console.log("parsedResponse:", parsedResponse);
  }
};

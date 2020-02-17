import { combineReducers } from "redux";
import userReducer from "./userReducer";
import restaurantReducer from "./restaurantReducer";

export default combineReducers({
  user: userReducer,
  restaurants: restaurantReducer
});

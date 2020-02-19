import { combineReducers } from "redux";
import userReducer from "./userReducer";
import restaurantReducer from "./restaurantReducer";
import filtersReducer from "./filtersReducer";

export default combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
  filters: filtersReducer
});

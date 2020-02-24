import { combineReducers } from "redux";
import userReducer from "./userReducer";
import restaurantReducer from "./restaurantReducer";
import filtersReducer from "./filtersReducer";
import addressReducer from "./addressReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
  filters: filtersReducer,
  addresses: addressReducer,
  cartItems: cartReducer
});

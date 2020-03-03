import { combineReducers } from "redux";

import userReducer from "./userReducer";
import restaurantReducer from "./restaurantReducer";
import filtersReducer from "./filtersReducer";
import addressReducer from "./addressReducer";
import favoritesReducer from "./favoritesReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
  filters: filtersReducer,
  addresses: addressReducer,
  favorites: favoritesReducer,
  cartItems: cartReducer
});

export default rootReducer;

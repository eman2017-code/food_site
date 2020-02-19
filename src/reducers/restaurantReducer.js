const initialState = {
  restaurants: [],
  restaurant: {},
  restaurantMenu: {}
};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case "LIST_RESTAURANTS":
      return {
        ...state,
        restaurants: action.payload
      };
    case "RECIEVE_SINGLE_RESTAURANT":
      return {
        ...state,
        restaurant: action.payload
      };
    case "RECIEVE_RESTAURANT_MENU":
      return {
        ...state,
        restaurantMenu: action.payload
      };
    default:
      return state;
  }
}

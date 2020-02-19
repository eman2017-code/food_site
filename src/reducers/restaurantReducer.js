const initialState = {
  restaurants: [],
  restaurant: {}
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
    default:
      return state;
  }
}

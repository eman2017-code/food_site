const initialState = {
  cart: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_USER_CART":
      return {
        ...state,
        cart: action.payload
      };
    case "CLEAR_CART":
      return {
        cart: []
      };
    default:
      return state;
  }
}

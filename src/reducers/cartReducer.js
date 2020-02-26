const initialState = {
  cart: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [action.payload, ...state.cart]
      };

    case "CLEAR_CART":
      return {
        cart: []
      };

    // case ''

    default:
      return state;
  }
}

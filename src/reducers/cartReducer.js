const initialState = {
  cart: []
};

export default function cartReducer(state = initialState, action) {
  const cartState = state.cart;
  const cartArr = [];
  cartArr.push(cartState);

  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...cartArr, action.payload]
      };

    case "CLEAR_CART":
      return {
        cart: []
      };
    default:
      return state;
  }
}

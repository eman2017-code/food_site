const initialState = {
  cart: []
};

export default function cartReducer(state = initialState, action) {
  const cartState = state.cart;
  const cartArr = [];
  cartArr.push(cartState);
  switch (action.type) {
    case "ADD_TO_CART":
      const newProduct = action.payload;
      state.cart.push(newProduct);
      return {
        ...state,
        cart: [...cartArr, action.payload]
      };

    case "CLEAR_CART":
      console.log("the cart has been cleared... via REDUCER");
      return {
        cart: []
      };
    default:
      return state;
  }
}

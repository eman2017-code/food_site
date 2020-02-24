const initialState = {
  cart: []
};

export default function cartReducer(state = initialState, action) {
  console.log("action:", action);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload
      };
    // case "REMOVE_FROM_CART":
    //   return {
    //     ...state,
    //     cart: cart.filter(item => item.product.id != action.payload.productId)
    //   };
    // case "UPDATE_CART_QUANTITY":
    //   let item = cart.find(item => item.product.id == action.payload.productId);

    //   let newCart = cart.filter(
    //     item => item.product.id != action.payload.productId
    //   );

    //   item.quantity = action.payload.quantity;

    //   newCart.push(item);

    //   return {
    //     ...state,
    //     cart: newCart
    //   };
    case "CLEAR_CART":
      return {
        cart: []
      };
    default:
      return state;
  }
}

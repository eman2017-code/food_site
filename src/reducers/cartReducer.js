const initialState = {
  cart: [],
  total: 0
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

    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          product => product.apiKey !== action.payload.apiKey
        )
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        total: state.cart.find(product => console.log(product.quantity))
      };

    default:
      return state;
  }
}

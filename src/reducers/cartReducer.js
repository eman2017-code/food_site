const initialState = {
  cart: [],
  quantity: 0
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const newProduct = action.payload;
      const quantity = action.quantity;

      // find the product
      let indexOfProduct = state.cart.findIndex(
        product => product.id === newProduct.id
      );

      // if the product already exists
      if (indexOfProduct !== -1) {
        state.cart[indexOfProduct].qty = quantity;
        state.cart[indexOfProduct].sum =
          newProduct.price * state.cart[indexOfProduct].qty;

        // if the product doesnt already exist
      } else {
        const formattedProduct = {
          ...newProduct,
          qty: quantity,
          sum: newProduct.price * quantity
        };

        state.cart.push(formattedProduct);
      }

      return {
        ...state,
        cart: state.cart
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

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        quantity: state.quantity + 1
      };

    default:
      return state;
  }
}

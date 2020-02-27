const initialState = {
  cart: [],
  quantity: 0
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [action.payload, ...state.cart],
        total: 1
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
      // find the product
      const foundProduct = state.cart.find(
        product => product.apiKey === action.payload.apiKey
      );
      // console.log("foundProduct:", foundProduct);

      // const productToAdd = action.payload
      // console.log("productToAdd:", productToAdd);

      // const quantityToAdd = action.qty;
      // console.log("quantityToAdd:", quantityToAdd);

      // let indexOfProduct = state.cart.findIndex(
      //   product => product.upc === productToAdd.id
      // );
      // console.log("indexOfProduct:", indexOfProduct);

      return {
        ...state,
        quantity: state.quantity + 1
      };

    default:
      return state;
  }
}

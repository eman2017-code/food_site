const initialState = {
  cart: [],
  quantity: 0
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const productToAdd = action.payload;
      const quantityToAdd = action.qty;

      let indexOfProduct = state.cart.findIndex(
        product => product.id === productToAdd.id
      );

      // if the product already exists
      if (indexOfProduct !== -1) {
        const productToUpdate = state.cart[indexOfProduct];

        // updates the products quantity and sum
        productToUpdate.qty = productToUpdate.qty + quantityToAdd;
        productToUpdate.sum = productToUpdate.price * productToUpdate.qty;

        // if the product doesnt already exist
      } else {
        // formats the product in the correct way
        const formattedProductToAdd = {
          ...productToAdd,
          qty: quantityToAdd,
          sum: productToAdd.price * quantityToAdd
        };

        state.cart.push(formattedProductToAdd);
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
        cart: state.cart.filter(product => product.id !== action.payload.id)
      };

    // increments the quantity of a product
    case "INCREMENT_QTY":
      indexOfProduct = state.cart.findIndex(
        product => product.id === action.payload.id
      );

      // if the product exists
      if (indexOfProduct !== -1) {
        const productToUpdate = state.cart[indexOfProduct];

        productToUpdate.qty = action.product.qty; // quantity already updated in the action
        productToUpdate.sum = productToUpdate.price * productToUpdate.qty;

        // otherwise if it doenst exist, just add the product to the cart
      } else {
        const formattedProductToAdd = {
          ...action.product,
          qty: 1,
          sum: productToAdd.price
        };
        state.cart.push(formattedProductToAdd);
      }

      return {
        ...state,
        cart: state.cart
      };

    default:
      return state;
  }
}

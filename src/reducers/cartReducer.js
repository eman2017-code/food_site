export default function cartReducer(
  state = {
    cart: []
  },
  action
) {
  switch (action.type) {
    case "ADD_TO_CART":
      const productId = action.product.apiKey;

      if (
        state.cart.findIndex(product => product.apiKey === productId) !== -1
      ) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.apiKey === productId) {
            cartAcc.push({
              ...product,
              qty: product.qty + 1,
              sum: (product.totalPrice / 100) * (product.qty + 1)
            }); // Increment qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            qty: action.qty,
            sum: (action.product.totalPrice / 100) * action.qty
          }
        ]
      };

    case "DECREMENT_QTY":
      if (
        state.cart.findIndex(product => product.apiKey === action.productId) !==
        -1
      ) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.apiKey === action.productId && product.qty > 1) {
            cartAcc.push({
              ...product,
              qty: product.qty - 1,
              sum: (product.totalPrice / 100) * (product.qty - 1)
            }); // Decrement qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            qty: action.qty,
            sum: action.payload.totalPrice * action.qty
          }
        ]
      };

    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          product => product.apiKey !== action.payload.apiKey
        )
      };

    case "CLEAR_CART":
      return {
        cart: []
      };

    default:
  }
  return state;
}

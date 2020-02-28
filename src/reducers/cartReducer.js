import ProductBox from "../components/home/ProductBox";

// const initialState = {
//   cart: [],
//   qty: 0
// };

// export default function cartReducer(state = initialState, action) {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cart: [action.payload, ...state.cart]
//       };

//     case "CLEAR_CART":
//       return {
//         cart: []
//       };

//     case "REMOVE_ITEM_FROM_CART":
//       return {
//         ...state,
//         cart: state.cart.filter(
//           product => product.apiKey !== action.payload.apiKey
//         )
//       };

//       return {
//         ...state,
//         quantity: state.quantity + 1
//       };

//     default:
//       return state;
//   }
// }

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
          if (product.id === productId) {
            cartAcc.push({
              ...product,
              qty: product.qty + 1,
              sum: (product.price / 100) * (product.qty + 1)
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
            sum: (action.product.price / 100) * action.qty
          }
        ]
      };

    case "DECREMENT_QTY":
      if (
        state.cart.findIndex(product => product.id === action.productId) !== -1
      ) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.id === action.product && product.qty > 1) {
            console.log("price: " + product.price + "Qty: " + product.qty);
            cartAcc.push({
              ...product,
              qty: product.qty - 1,
              sum: (product.price / 100) * (product.qty - 1)
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
            sum: action.product.price * action.qty
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

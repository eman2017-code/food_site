/* 
    This file will hold all of the business logic for the app
*/

export const getCartTotal = cartItems => {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].qty === undefined) {
      cartItems[i].qty = 1;
    }

    total += cartItems[i].qty * cartItems[i].totalPrice;
  }
  console.log("total:", total);
  return total;
};

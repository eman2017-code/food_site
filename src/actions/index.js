// login user
export const loginUser = user => {
  return {
    type: "LOGIN_USER",
    payload: user
  };
};

// register user
export const registerUser = user => {
  return {
    type: "REGISTER_USER",
    payload: user
  };
};

// logout user
export const logoutUser = user => {
  return {
    type: "LOGOUT_USER",
    payload: user
  };
};

// list all restaurants
export const listRestaurants = restaurants => {
  return {
    type: "LIST_RESTAURANTS",
    payload: restaurants
  };
};

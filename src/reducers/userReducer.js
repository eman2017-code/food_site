const initialState = {
  isLoggedIn: false,
  userInfo: {}
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload
      };
    case "REGISTER_USER":
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload
      };
    default:
      return state;
  }
}

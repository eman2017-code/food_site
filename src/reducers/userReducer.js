const initialState = {
  isLoggedIn: false,
  userInfo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo
      };
    case "REGISTER_USER":
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {}
      };
    default:
      return state;
  }
}

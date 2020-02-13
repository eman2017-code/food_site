export default function(state = null, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        userInfo: action.userInfo
      };
    case "REGISTER_USER":
      return {
        ...state,
        userInfo: action.userInfo
      };
    case "LOGOUT_USER":
      return {
        ...state,
        userInfo: {}
      };
    default:
      return state;
  }
}

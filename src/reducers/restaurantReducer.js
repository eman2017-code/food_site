export default function restaurantReducer(state = [], action) {
  switch (action.type) {
    case "LIST_RESTAURANTS":
      return action.payload;
    case "RECIEVE_SINGLE_RESTAURANT":
      return action.payload;
    default:
      return state;
  }
}

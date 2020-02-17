export default (state = [], action) => {
  switch (action.type) {
    case "LIST_RESTAURANTS":
      return action.payload;
    default:
      return state;
  }
};

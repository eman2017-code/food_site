import { createStore, applyMiddleware, compose } from "redux";

import thunkMiddleWare from "redux-thunk";

import reducers from "../reducers";

// saves the cache if a user reloads the page
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    return undefined;
  }
}

// loads the cache if the user exits site and comes back
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

// this will be called when the site first loads
const peristedState = loadFromLocalStorage();

const store = createStore(
  reducers,
  peristedState,
  /* 
    Expected the enhancer to be a function error will occur.
    Reducers are always the enhancer
  */
  compose(applyMiddleware(thunkMiddleWare))
);

// this saves the state after the redux store changes
store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage(state);
});

export default store;

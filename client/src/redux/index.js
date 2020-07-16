// REDUX STORE

// Modules
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { default as alerts } from "./modules/alert";
import { default as auth } from "./modules/auth";
import { default as profile } from "./modules/profile";
// Middleware
const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  loggerMiddleware // <- Not in production
)(createStore);

// Main Reducer
const reducer = combineReducers({
  alerts,
  auth,
  profile,
});

// Create store
const store = (initialState = {}) =>
  createStoreWithMiddleware(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // <- Not in production
  );

// Export to ./src/App.js
export default store;

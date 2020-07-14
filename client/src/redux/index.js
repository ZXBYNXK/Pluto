import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { default as alerts } from "./modules/alert";

// Imported Reducers to be combined
const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  loggerMiddleware
)(createStore);

const reducer = combineReducers({
  alerts,
});

const store = (initialState) =>
  createStoreWithMiddleware(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;

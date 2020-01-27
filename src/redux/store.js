import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //middleware or store enhancer

import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const intialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, intialState, enhancer);

export default store;

import { combineReducers, createStore } from "redux";

const initialState = {
  color: "#fff",
  LIGHTNESS: 50,
  SATURATION: 100,
  SELECTOR_COUNT: 3,
  LINKED: false
};

export const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIGHTNESS":
      return {
        ...state,
        LIGHTNESS: action.LIGHTNESS
      };
    case "SET_SATURATION":
      return {
        ...state,
        SATURATION: action.SATURATION
      };
    case "SET_SELECTOR_COUNT":
      return {
        ...state,
        SELECTOR_COUNT: action.SELECTOR_COUNT
      };
    case "SET_LINKED":
      return {
        ...state,
        LINKED: !state.LINKED
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  actionReducer
});

// store.js
export const store = createStore(reducers);

import { combineReducers, createStore } from "redux";

const initialState = {
  COLORS: ['#FFF','#FFF','#FFF'],
  LIGHTNESS: 50,
  SATURATION: 100,
  SELECTOR_COUNT: 3,
  LINKED: false,
  DARK_MODE: false,
  RESET: 0 //for comp. rerender if init state doesnt change a prop
};

export const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COLOR":
      let CURRENT_COLORS =  state.COLORS;
      CURRENT_COLORS[action.INDEX] = action.COLOR
      return {
        ...state,
        COLORS: CURRENT_COLORS
      };
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
      let NEW_COLORS = [];
      NEW_COLORS.length = action.SELECTOR_COUNT;
      NEW_COLORS.fill('#FFF')
      return {
        ...state,
        COLORS: NEW_COLORS,
        SELECTOR_COUNT: action.SELECTOR_COUNT
      };
    case "SET_LINKED":
      return {
        ...state,
        LINKED: !state.LINKED
      };
    case "SET_DARK_MODE":
      return {
        ...state,
        DARK_MODE: !state.DARK_MODE
      };
    case "RESET":
      return {
        ...initialState,
        RESET: 1 - state.RESET
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  actionReducer
});

// store.js
export const store = createStore(reducers);

import { combineReducers, createStore } from "redux";

const initialState = {
  COLORS: ["#FFF", "#FFF", "#FFF"],
  LIGHTNESS: 50,
  SATURATION: 100,
  SELECTOR_COUNT: 4,
  SELECTOR_ANGLE: 180,
  SELECTOR_RADIUS: 118,
  SELECTOR_STAGGER: 0,
  LINKED: false,
  DARK_MODE: false,
  HASH: true,
  QUOTES: true,
  PRESET: "default",
  RESET: 0 //for comp. rerender if init state doesnt change a prop
};

export const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COLOR":
      let CURRENT_COLORS = [...state.COLORS];
      CURRENT_COLORS[action.INDEX] = action.COLOR;
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
      NEW_COLORS.fill("#FFF");
      return {
        ...state,
        COLORS: NEW_COLORS,
        SELECTOR_COUNT: action.SELECTOR_COUNT
      };
    case "SET_SELECTOR_ANGLE":
      return {
        ...state,
        SELECTOR_ANGLE: action.SELECTOR_ANGLE
      };
    case "SET_SELECTOR_RADIUS":
      return {
        ...state,
        SELECTOR_RADIUS: action.SELECTOR_RADIUS
      };
    case "SET_SELECTOR_STAGGER":
      return {
        ...state,
        SELECTOR_STAGGER: action.SELECTOR_STAGGER
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
    case "SET_DARK_MODE":
      return {
        ...state,
        DARK_MODE: !state.DARK_MODE
      };
    case "SET_HASH":
      return {
        ...state,
        HASH: !state.HASH
      };
    case "SET_QUOTES":
      return {
        ...state,
        QUOTES: !state.QUOTES
      };
    case "SET_PRESET":
      if (action.PRESET === "default") {
        return {
          ...initialState,
          DARK_MODE: state.DARK_MODE,
          SELECTOR_COUNT: state.SELECTOR_COUNT
        };
      } else if (action.PRESET === "triad") {
        return {
          ...initialState,
          SELECTOR_COUNT: 9,
          SELECTOR_ANGLE: 360,
          DARK_MODE: state.DARK_MODE,
          PRESET: action.PRESET
        };
      } else if (action.PRESET === "tetrad") {
        return {
          ...initialState,
          SELECTOR_COUNT: 12,
          SELECTOR_ANGLE: 360,
          DARK_MODE: state.DARK_MODE,
          PRESET: action.PRESET
        };
      } else if (action.PRESET === "pentad") {
        return {
          ...initialState,
          SELECTOR_COUNT: 10,
          SELECTOR_ANGLE: 360,
          DARK_MODE: state.DARK_MODE,
          PRESET: action.PRESET
        };
      } else {
        return {
          ...initialState,
          SELECTOR_COUNT: state.SELECTOR_COUNT,
          SELECTOR_ANGLE: 360,
          PRESET: action.PRESET
        };
      }

    case "RESET":
      return {
        ...initialState,
        DARK_MODE: state.DARK_MODE,
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

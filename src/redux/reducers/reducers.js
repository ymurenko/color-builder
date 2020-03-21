import { combineReducers, createStore } from "redux";

const initialState = {
  COLORS: ["#FFF", "#FFF", "#FFF"],
  PALETTES: [],
  LIGHTNESS: 50,
  SATURATION: 100,
  SELECTOR_COUNT: 4,
  SELECTOR_ANGLE: 180,
  SELECTOR_RADIUS: 118,
  SELECTOR_STAGGER: 0,
  CLUSTER_ANGLE: 30,
  LINKED: false,
  DARK_MODE: false,
  HASH: true,
  QUOTES: true,
  PRESET: 1,
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
    case "STORE_PALETTE":
      let NEW_PALETTES = [...state.PALETTES];
      NEW_PALETTES.push([...state.COLORS])
      return {
        ...state,
        PALETTES: NEW_PALETTES
      }
    case "DELETE_PALETTE":
      let CURRENT_PALETTES = [...state.PALETTES];
      CURRENT_PALETTES.splice(action.INDEX, 1);
      return {
        ...state,
        PALETTES: CURRENT_PALETTES
      }
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
      switch (action.PRESET) {
        case 2:
          return {
            ...initialState,
            PALETTES: state.PALETTES,
            SELECTOR_ANGLE: 360,
            DARK_MODE: state.DARK_MODE,
            PRESET: action.PRESET,
            LINKED: true,
            CLUSTER_ANGLE: 20
          };
        case 3:
          return {
            ...initialState,
            PALETTES: state.PALETTES,
            SELECTOR_ANGLE: 360,
            DARK_MODE: state.DARK_MODE,
            PRESET: action.PRESET,
            LINKED: true,
            CLUSTER_ANGLE: 16
          };
        case 4:
          return {
            ...initialState,
            PALETTES: state.PALETTES,
            SELECTOR_ANGLE: 360,
            DARK_MODE: state.DARK_MODE,
            PRESET: action.PRESET,
            LINKED: true,
            CLUSTER_ANGLE: 16
          };
        case 5:
          return {
            ...initialState,
            PALETTES: state.PALETTES,
            SELECTOR_ANGLE: 360,
            DARK_MODE: state.DARK_MODE,
            PRESET: action.PRESET,
            LINKED: true,
            CLUSTER_ANGLE: 15
          };
        default:
          return state
      }
    case "SET_CLUSTER_ANGLE":
      return {
        ...state,
        CLUSTER_ANGLE: action.CLUSTER_ANGLE
      };
    case "RESET":
      return {
        ...initialState,
        PALETTES: state.PALETTES,
        SELECTOR_COUNT: state.SELECTOR_COUNT,
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

import { combineReducers, createStore } from "redux";
import { getViewport } from "../../util/viewport-height";

const initialState = {
  VIEWPORT_HEIGHT: getViewport(),
  COLORS: [
    [255, 255, 255],
    [255, 255, 255],
    [255, 255, 255],
    [255, 255, 255]
  ],
  PREFIX: true,
  QUOTES: true,
  COLOR_MODE: 1,
  PALETTES: [],
  ACTIVE_PALETTE: { index: -1, palette: [] },
  LIGHTNESS: 50,
  SATURATION: 100,
  SELECTOR_COUNT: 4,
  SELECTOR_ANGLE: 180,
  SELECTOR_RADIUS: (getViewport() * 0.325) / 2,
  SELECTOR_LINKED_RADIUS: (getViewport() * 0.325) / 2,
  SELECTOR_STAGGER: 0,
  CLUSTER_ANGLE: 30,
  LINKED: false,
  DARK_MODE: false,
  PRESET: 1,
  RESET: 0, //for comp. rerender if init state doesnt change a prop
  MODE: 0,
  EDIT_SETTING: [false, false, true],
  EDIT_INCREMENT: 10
};

export const actionReducer = (state = initialState, action) => {
  let CURRENT_PALETTES_COPY = [...state.PALETTES];
  let ACTIVE_PALETTE_COPY = [...state.ACTIVE_PALETTE.palette];
  let ACTIVE_PALETTE_INDEX = state.ACTIVE_PALETTE.index;
  switch (action.type) {
    case "SET_VIEWPORT_HEIGHT":
      return {
        ...state,
        SELECTOR_RADIUS: (getViewport() * 0.325) / 2,
        VIEWPORT_HEIGHT: getViewport()
      };
    case "SET_COLOR":
      //mutating state by reference
      let CURRENT_COLORS = state.COLORS;
      CURRENT_COLORS[action.INDEX] = action.COLOR;
      return {
        ...state,
        COLORS: CURRENT_COLORS
      };
    case "SET_PREFIX":
      return {
        ...state,
        PREFIX: !state.PREFIX
      };
    case "SET_QUOTES":
      return {
        ...state,
        QUOTES: !state.QUOTES
      };
    case "SET_COLOR_MODE":
      return {
        ...state,
        COLOR_MODE: action.COLOR_MODE
      };
    case "STORE_PALETTE":
      if (state.PALETTES.length < 5) {
        CURRENT_PALETTES_COPY.push([...state.COLORS]);
        return {
          ...state,
          PALETTES: CURRENT_PALETTES_COPY
        };
      } else {
        return {
          ...state
        };
      }
    case "SET_CURRENT_PALETTE":
      let SELECTED_PALETTE = CURRENT_PALETTES_COPY[action.INDEX];
      return {
        ...state,
        ACTIVE_PALETTE: { index: action.INDEX, palette: SELECTED_PALETTE }
      };
    case "DELETE_PALETTE":
      CURRENT_PALETTES_COPY.splice(action.INDEX, 1);
      if (state.ACTIVE_PALETTE.index === action.INDEX) {
        return {
          ...state,
          ACTIVE_PALETTE: initialState.ACTIVE_PALETTE,
          PALETTES: CURRENT_PALETTES_COPY
        };
      } else {
        return {
          ...state,
          PALETTES: CURRENT_PALETTES_COPY
        };
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
      NEW_COLORS.fill([255, 255, 255]);
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
        SELECTOR_RADIUS: action.SELECTOR_RADIUS,
        SELECTOR_LINKED_RADIUS: action.SELECTOR_RADIUS
      };
    case "SET_SELECTOR_LINKED_RADIUS":
      return {
        ...state,
        SELECTOR_LINKED_RADIUS: action.SELECTOR_LINKED_RADIUS
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
    case "SET_PRESET":
      switch (action.PRESET) {
        case 2:
          return {
            ...initialState,
            VIEWPORT_HEIGHT: state.VIEWPORT_HEIGHT,
            SELECTOR_RADIUS: (getViewport() * 0.325) / 2,
            SELECTOR_LINKED_RADIUS: (getViewport() * 0.325) / 2,
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
            VIEWPORT_HEIGHT: state.VIEWPORT_HEIGHT,
            SELECTOR_RADIUS: (getViewport() * 0.325) / 2,
            SELECTOR_LINKED_RADIUS: (getViewport() * 0.325) / 2,
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
            VIEWPORT_HEIGHT: state.VIEWPORT_HEIGHT,
            SELECTOR_RADIUS: (getViewport() * 0.325) / 2,
            SELECTOR_LINKED_RADIUS: (getViewport() * 0.325) / 2,
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
            VIEWPORT_HEIGHT: state.VIEWPORT_HEIGHT,
            SELECTOR_RADIUS: (getViewport() * 0.325) / 2,
            SELECTOR_LINKED_RADIUS: (getViewport() * 0.325) / 2,
            PALETTES: state.PALETTES,
            SELECTOR_ANGLE: 360,
            DARK_MODE: state.DARK_MODE,
            PRESET: action.PRESET,
            LINKED: true,
            CLUSTER_ANGLE: 15
          };
        default:
          return state;
      }
    case "SET_CLUSTER_ANGLE":
      return {
        ...state,
        CLUSTER_ANGLE: action.CLUSTER_ANGLE
      };
    case "RESET":
      return {
        ...initialState,
        VIEWPORT_HEIGHT: state.VIEWPORT_HEIGHT,
        SELECTOR_RADIUS: (state.VIEWPORT_HEIGHT * 0.325) / 2,
        SELECTOR_LINKED_RADIUS: (state.VIEWPORT_HEIGHT * 0.325) / 2,
        PALETTES: state.PALETTES,
        ACTIVE_PALETTE: state.ACTIVE_PALETTE,
        DARK_MODE: state.DARK_MODE,
        RESET: 1 - state.RESET
      };
    case "SET_MODE":
      if (state.PALETTES.length === 0) {
        CURRENT_PALETTES_COPY.push([...state.COLORS]);
        return {
          ...state,
          ACTIVE_PALETTE: { index: 0, palette: [...state.COLORS] },
          PALETTES: CURRENT_PALETTES_COPY,
          MODE: action.MODE
        };
      }
      return {
        ...state,
        MODE: action.MODE
      };
    case "SET_EDIT_SETTING":
      let EDIT_SETTING_COPY = [...state.EDIT_SETTING];
      EDIT_SETTING_COPY[action.INDEX] = !EDIT_SETTING_COPY[action.INDEX];
      return {
        ...state,
        EDIT_SETTING: EDIT_SETTING_COPY
      };
    case "SET_EDIT_INCREMENT":
      return {
        ...state,
        EDIT_INCREMENT: action.EDIT_INCREMENT
      };
    case "UPDATE_PALETTE_SINGLE":
      ACTIVE_PALETTE_COPY[action.INDEX] = action.NEW_COLOR;
      CURRENT_PALETTES_COPY[ACTIVE_PALETTE_INDEX] = ACTIVE_PALETTE_COPY;
      return {
        ...state,
        ACTIVE_PALETTE: {
          index: ACTIVE_PALETTE_INDEX,
          palette: ACTIVE_PALETTE_COPY
        },
        PALETTES: CURRENT_PALETTES_COPY
      };

    case "UPDATE_PALETTE_ALL":
      ACTIVE_PALETTE_COPY = action.NEW_COLORS;
      CURRENT_PALETTES_COPY[ACTIVE_PALETTE_INDEX] = ACTIVE_PALETTE_COPY;
      return {
        ...state,
        ACTIVE_PALETTE: {
          index: ACTIVE_PALETTE_INDEX,
          palette: ACTIVE_PALETTE_COPY
        },
        PALETTES: CURRENT_PALETTES_COPY
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

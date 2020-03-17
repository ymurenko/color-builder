//import { SET_COLOR } from "./action-types";

export const storeColor = (val, index) => (
  { type: 'SET_COLOR', COLOR: val, INDEX: index }
)
export const setLightness = (val) => (
  { type: 'SET_LIGHTNESS', LIGHTNESS: val }
)
export const setSaturation = (val) => (
  { type: 'SET_SATURATION', SATURATION: val }
)
export const setSelectorCount = (val) => (
  { type: 'SET_SELECTOR_COUNT', SELECTOR_COUNT: val }
)
export const setSelectorAngle = (val) => (
  { type: 'SET_SELECTOR_ANGLE', SELECTOR_ANGLE: val }
)
export const setSelectorRadius = (val) => (
  { type: 'SET_SELECTOR_RADIUS', SELECTOR_RADIUS: val }
)
export const setLinkedState = () => (
  { type: 'SET_LINKED' }
)
export const setDarkMode = () => (
  { type: 'SET_DARK_MODE' }
)
export const setCopyType = () => (
  { type: 'SET_COPY_TYPE' }
)
export const setQuotes = () => (
  { type: 'SET_QUOTES' }
)
export const setHash = () => (
  { type: 'SET_HASH' }
)
export const resetState = () => (
  { type: 'RESET' }
)

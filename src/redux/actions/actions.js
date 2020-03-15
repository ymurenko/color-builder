//import { SET_COLOR } from "./action-types";

export const storeColor = (val, index) => (
  { type: 'SET_COLOR', COLOR: val, INDEX: index }
)
export const storeLightness = (val) => (
  { type: 'SET_LIGHTNESS', LIGHTNESS: val }
)
export const storeSaturation = (val) => (
  { type: 'SET_SATURATION', SATURATION: val }
)
export const storeSelectorCount = (val) => (
  { type: 'SET_SELECTOR_COUNT', SELECTOR_COUNT: val }
)
export const setLinkedState = () => (
  { type: 'SET_LINKED' }
)
export const setDarkMode = () => (
  { type: 'SET_DARK_MODE' }
)
export const resetState = () => (
  { type: 'RESET' }
)
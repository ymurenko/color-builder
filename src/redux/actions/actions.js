//import { SET_COLOR } from "./action-types";

export const storeColor = (color) => (
  { type: 'SET_COLOR', color: color }
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
export const resetState = () => (
  { type: 'RESET' }
)
//import { SET_COLOR } from "./action-types";

export const setViewport = () => (
  { type: 'SET_VIEWPORT_HEIGHT' }
)
export const storeColor = (val, index) => (
  { type: 'SET_COLOR', COLOR: val, INDEX: index }
)
export const setColorMode = (val) => (
  { type: 'SET_COLOR_MODE', COLOR_MODE: val }
)
export const setCurrentPalette = (index) => (
  { type: 'SET_CURRENT_PALETTE', INDEX: index}
)
export const storePalette = () => (
  { type: 'STORE_PALETTE' }
)
export const deletePalette = (index) => (
  { type: 'DELETE_PALETTE', INDEX: index}
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
export const setSelectorLinkedRadius = (val) => (
  { type: 'SET_SELECTOR_LINKED_RADIUS', SELECTOR_LINKED_RADIUS: val}
)
export const setSelectorStagger = (val) => (
  { type: 'SET_SELECTOR_STAGGER', SELECTOR_STAGGER: val }
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
export const setPreset = (val) => (
  { type: 'SET_PRESET', PRESET: val }
)
export const setClusterAngle = (val) => (
  { type: 'SET_CLUSTER_ANGLE', CLUSTER_ANGLE: val }
)
export const resetState = () => (
  { type: 'RESET' }
)
export const setMode = (val) => (
  { type: 'SET_MODE', MODE: val }
)
export const setEditSetting = (val) => (
  { type: 'SET_EDIT', EDIT_SETTING: val}
)
export const setEditIncrement = (val) => (
  { type: 'SET_EDIT_INCREMENT', EDIT_INCREMENT: val}
)
export const updateActivePlaette = (val, index) => (
  { type: 'UPDATE_ACTIVE_PALETTE', NEW_COLOR: val, INDEX: val }
)
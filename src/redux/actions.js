import { SET_COLOR } from "./action-types";

export function setColor(payload) {
  return { type: SET_COLOR, payload };
}
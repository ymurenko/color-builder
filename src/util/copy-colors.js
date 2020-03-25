import copy from "copy-to-clipboard";
import { colorIntegersToString, colorIntegersToHSL } from "./color-utility";

export const copyAllColors = (colorArr, colorMode, quotes, prefix) => {
  colorArr.forEach((color, i) => {
    colorArr[i] = getColorString(color, colorMode);
    if (!prefix) {
      if (colorMode === 1) {
        colorArr[i] = colorArr[i].substr(1);
      } else if (colorMode === 2 || 3) {
        colorArr[i] = colorArr[i].replace(/[^\d,]+/g, "");
      }
    }
    if (quotes) {
      colorArr[i] = `'${colorArr[i]}'`;
    }
  });
  copy(colorArr);
};

export const copyColor = (colorInts, colorMode, quotes, prefix) => {
  let color = getColorString(colorInts, colorMode);
  if (!prefix) {
    if (colorMode === 1) {
      color = color.substr(1);
    } else if (colorMode === 2 || 3) {
      color = color.replace(/[^\d,]+/g, "");
    }
  }
  if (quotes) {
    color = `'${color}'`;
  }
  copy(color);
};

export const getColorString = (colorInts, colorMode) => {
  if (colorMode === 1) {
    return colorIntegersToString(colorInts, "hex");
  } else if (colorMode === 2) {
    return colorIntegersToString(colorInts, "rgb");
  } else if (colorMode === 3) {
    return colorIntegersToString(colorIntegersToHSL(colorInts), "hsl");
  }
};

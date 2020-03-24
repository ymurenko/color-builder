import React, { useRef } from "react";
import { connect } from "react-redux";
import {
  colorIntegersToString,
  colorIntegersToHSL,
  HSLToColorIntegers
} from "../../../util/color-utility";
import "./EditorColorBlock.scss";

const EditorColorBlock_ = props => {
  let width = (1.437 * props.Viewport) / props.activePalette.palette.length;

  const getColorString = (
    colorInts = props.activePalette.palette[props.index]
  ) => {
    if (props.colorMode === 1) {
      return colorIntegersToString(colorInts, "hex");
    } else if (props.colorMode === 2) {
      return colorIntegersToString(colorInts, "rgb");
    } else if (props.colorMode === 3) {
      return colorIntegersToString(colorIntegersToHSL(colorInts), "hsl");
    }
  };

  const getGreaterColor = () => {
    let colorInts = props.activePalette.palette[props.index];
    colorInts = colorIntegersToHSL(colorInts);
    let greaterColor;
    if (props.editSetting[0] === true) {
      greaterColor = colorInts[0] + props.increment;
      if (greaterColor < 360) {
        colorInts[0] = greaterColor;
      } else {
        colorInts[0] = 360;
      }
    }
    if (props.editSetting[1] === true) {
      greaterColor = colorInts[1] + props.increment;
      if (greaterColor < 100) {
        colorInts[1] = greaterColor;
      } else {
        colorInts[1] = 100;
      }
    }
    if (props.editSetting[2] === true) {
      greaterColor = colorInts[2] + props.increment;
      if (greaterColor < 100) {
        colorInts[2] = greaterColor;
      } else {
        colorInts[2] = 100;
      }
    }
    return HSLToColorIntegers(colorInts);
  };

  const getLesserColor = () => {
    let colorInts = props.activePalette.palette[props.index];
    colorInts = colorIntegersToHSL(colorInts);
    let lesserColor;
    if (props.editSetting[0] === true) {
      lesserColor = colorInts[0] - props.increment;
      if (lesserColor > 0) {
        colorInts[0] = lesserColor;
      } else {
        colorInts[0] = 0;
      }
    }
    if (props.editSetting[1] === true) {
      lesserColor = colorInts[1] - props.increment;
      if (lesserColor > 0) {
        colorInts[1] = lesserColor;
      } else {
        colorInts[1] = 0;
      }
    }
    if (props.editSetting[2] === true) {
      lesserColor = colorInts[2] - props.increment;
      if (lesserColor > 0) {
        colorInts[2] = lesserColor;
      } else {
        colorInts[2] = 0;
      }
    }
    return HSLToColorIntegers(colorInts);
  };

  return (
    <div
      className={`editor-color-block
      ${props.editor ? "editor-mode" : ""}
      ${props.darkMode ? "dark" : ""}`}
      style={{ width: width }}
    >
      <div
        className="greater-color"
        style={{ backgroundColor: getColorString(getGreaterColor()) }}
      ></div>
      <div
        className="current-color"
        style={{ backgroundColor: getColorString() }}
      ></div>
      <div
        className="lesser-color"
        style={{ backgroundColor: getColorString(getLesserColor()) }}
      ></div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    Viewport: state.actionReducer.VIEWPORT_HEIGHT,
    activePalette: state.actionReducer.ACTIVE_PALETTE,
    colorMode: state.actionReducer.COLOR_MODE,
    editSetting: state.actionReducer.EDIT_SETTING,
    increment: state.actionReducer.EDIT_INCREMENT
  };
}

const EditorColorBlock = connect(mapStateToProps)(EditorColorBlock_);

export default EditorColorBlock;

import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import {
  colorIntegersToString,
  colorIntegersToHSL,
  HSLToColorIntegers
} from "../../../util/color-utility";
import { updateActivePalette } from "../../../redux/actions/actions";
import { store } from "../../../redux/reducers/reducers";
import "./EditorColorBlock.scss";

const EditorColorBlock_ = props => {
  let width = (1.437 * props.Viewport) / store.getState().actionReducer.ACTIVE_PALETTE.palette.length;


  const getColorString = (
    colorInts = props.activePalette
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
    let colorInts = props.activePalette;
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
    let colorInts = props.activePalette;
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
        style={{
          backgroundColor: getColorString(getGreaterColor()),
          color: getColorString(getGreaterColor())
        }}
        onClick={() => {
          props.updateActivePalette(getGreaterColor(), props.index);
        }}
      >
        +
      </div>
      <div
        className="current-color"
        style={{ backgroundColor: getColorString(), color: getColorString() }}
      ></div>
      <div
        className="lesser-color"
        style={{
          backgroundColor: getColorString(getLesserColor()),
          color: getColorString(getLesserColor())
        }}
        onClick={() => {
          props.updateActivePalette(getLesserColor(), props.index)
        }}
      >
        -
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    Viewport: state.actionReducer.VIEWPORT_HEIGHT,
    activePalette: state.actionReducer.ACTIVE_PALETTE.palette[ownProps.index],
    colorMode: state.actionReducer.COLOR_MODE,
    editSetting: state.actionReducer.EDIT_SETTING,
    increment: state.actionReducer.EDIT_INCREMENT
  };
}

const mapDispatchToProps = {
  updateActivePalette
};

const EditorColorBlock = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorColorBlock_);

export default EditorColorBlock;

import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import {
  colorIntegersToString,
  colorIntegersToHSL,
  HSLToColorIntegers
} from "../../../util/color-utility";
import { updatePaletteSingle } from "../../../redux/actions/actions";
import { store } from "../../../redux/reducers/reducers";


const EditorColorBlock_ = props => {
  let width = (1.312 * props.viewport) / store.getState().actionReducer.ACTIVE_PALETTE.palette.length;


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
      if (greaterColor >= 360) {
        return HSLToColorIntegers(colorInts);
      } else {
        colorInts[0] = greaterColor;
      }
    }
    if (props.editSetting[1] === true) {
      greaterColor = colorInts[1] + props.increment;
      if (greaterColor >= 100) {
        return HSLToColorIntegers(colorInts);
      } else {
        colorInts[1] = greaterColor;
      }
    }
    if (props.editSetting[2] === true) {
      greaterColor = colorInts[2] + props.increment;
      if (greaterColor >= 100) {
        return HSLToColorIntegers(colorInts);
      } else {
        colorInts[2] = greaterColor;
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
      if (lesserColor <= 1) {
        return HSLToColorIntegers(colorInts);
      } else {
        colorInts[0] = lesserColor;
      }
    }
    if (props.editSetting[1] === true) {
      lesserColor = colorInts[1] - props.increment;
      if (lesserColor <= 1) {
        return HSLToColorIntegers(colorInts);
      } else {
        colorInts[1] = lesserColor;
      }
    }
    if (props.editSetting[2] === true) {
      lesserColor = colorInts[2] - props.increment;
      if (lesserColor <= 1) {
        return HSLToColorIntegers(colorInts);
      } else {
        colorInts[2] = lesserColor;
      }
    }
    return HSLToColorIntegers(colorInts);
  };

  return (
    <div
      className={`editor-color-block
      ${props.editor ? "editor-mode" : ""}`}
      style={{ width: width }}
    >
      <div
        className="greater-color"
        style={{
          backgroundColor: getColorString(getGreaterColor()),
          color: getColorString(getGreaterColor())
        }}
        onClick={() => {
          props.updatePaletteSingle(getGreaterColor(), props.index);
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
          props.updatePaletteSingle(getLesserColor(), props.index)
        }}
      >
        -
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    viewport: state.actionReducer.VIEWPORT_HEIGHT,
    activePalette: state.actionReducer.ACTIVE_PALETTE.palette[ownProps.index],
    colorMode: state.actionReducer.COLOR_MODE,
    editSetting: state.actionReducer.EDIT_SETTING,
    increment: state.actionReducer.EDIT_INCREMENT
  };
}

const mapDispatchToProps = {
  updatePaletteSingle
};

const EditorColorBlock = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorColorBlock_);

export default EditorColorBlock;

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  intToHSL,
  HSLtoInt,
} from "../../../util/color-utility";
import { updatePaletteSingle } from "../../../redux/actions/actions";
import { copyColor, getColorString } from "../../../util/copy-colors";
import { store } from "../../../redux/reducers/reducers";

const EditorColorBlock_ = props => {
  const avgColor = () => {
    let rgb = [...props.activePalette];
    return 255 - Math.round((rgb[0] + rgb[1] + rgb[2]) / 3);
  };

  const [avg, setAvg] = useState(avgColor());

  let width =
    (1.36 * props.viewport) /
    store.getState().actionReducer.ACTIVE_PALETTE.palette.length;

  const getGreaterColor = () => {
    let colorInts = props.activePalette;
    colorInts = intToHSL(colorInts);
    let greaterColor;
    if (props.editSetting[0] === true) {
      greaterColor = colorInts[0] + props.increment;
      if (greaterColor >= 360) {
        return HSLtoInt(colorInts);
      } else {
        colorInts[0] = greaterColor;
      }
    }
    if (props.editSetting[1] === true) {
      greaterColor = colorInts[1] + props.increment;
      if (greaterColor >= 100) {
        return HSLtoInt(colorInts);
      } else {
        colorInts[1] = greaterColor;
      }
    }
    if (props.editSetting[2] === true) {
      greaterColor = colorInts[2] + props.increment;
      if (greaterColor >= 100) {
        return HSLtoInt(colorInts);
      } else {
        colorInts[2] = greaterColor;
      }
    }
    return HSLtoInt(colorInts);
  };

  const getLesserColor = () => {
    let colorInts = props.activePalette;
    colorInts = intToHSL(colorInts);
    let lesserColor;
    if (props.editSetting[0] === true) {
      lesserColor = colorInts[0] - props.increment;
      if (lesserColor <= 1) {
        return HSLtoInt(colorInts);
      } else {
        colorInts[0] = lesserColor;
      }
    }
    if (props.editSetting[1] === true) {
      lesserColor = colorInts[1] - props.increment;
      if (lesserColor <= 1) {
        return HSLtoInt(colorInts);
      } else {
        colorInts[1] = lesserColor;
      }
    }
    if (props.editSetting[2] === true) {
      lesserColor = colorInts[2] - props.increment;
      if (lesserColor <= 1) {
        return HSLtoInt(colorInts);
      } else {
        colorInts[2] = lesserColor;
      }
    }
    return HSLtoInt(colorInts);
  };

  useEffect(() => {
    setAvg(avgColor());
  }, [props.color, props.colorMode, avgColor]);

  return (
    <div
      className={`editor-color-block
      ${props.editor ? "editor-mode" : ""}`}
      style={{ width: width }}
    >
      <div
        className="greater-color"
        style={{
          backgroundColor: getColorString(getGreaterColor(), props.colorMode),
          color: `rgba(${avg}, ${avg}, ${avg}, 0.7)`
        }}
        onClick={() => {
          props.updatePaletteSingle(getGreaterColor(), props.index);
        }}
      >
        +
      </div>
      <div
        className="current-color"
        style={{
          backgroundColor: getColorString(props.activePalette, props.colorMode),
        }}
        onClick={() => copyColor(props.activePalette, props.colorMode, props.quotes, props.prefix)}
      >
        <span className="copy-prompt" style={{color: `rgba(${avg}, ${avg}, ${avg}, 0.7)`}} >Copy</span>
        <span className="label color-label" style={{color: `rgba(${avg}, ${avg}, ${avg}, 0.3)`}}>{getColorString(props.activePalette, props.colorMode)}</span>
      </div>
      <div
        className="lesser-color"
        style={{
          backgroundColor: getColorString(getLesserColor(), props.colorMode),
          color: `rgba(${avg}, ${avg}, ${avg}, 0.7)`
        }}
        onClick={() => {
          props.updatePaletteSingle(getLesserColor(), props.index);
        }}
      >
        -
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    prefix: state.actionReducer.PREFIX,
    quotes: state.actionReducer.QUOTES,
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

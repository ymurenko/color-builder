import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { updatePaletteAll } from "../../../redux/actions/actions";
import {
  intToHSL,
  HSLtoInt
} from "../../../util/color-utility";
import EditorColorBlock from "./EditorColorBlock";
import "./CurrentPalette.scss";

const CurrentPalette_ = props => {
  const renderEditorColorBlocks = props.activePalette.palette.map(
    (color, i) => <EditorColorBlock className="block-color" key={i} index={i} />
  );

  const getGreaterColors = colorInts => {
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

  const getLesserColors = colorInts => {
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

  const incrementAllUp = () => {
    let activePaletteColors = [...props.activePalette.palette];
    for (let i = 0; i < activePaletteColors.length; i++) {
      activePaletteColors[i] = getGreaterColors(activePaletteColors[i]);
    }
    return activePaletteColors;
  };

  const incrementAllDown = () => {
    let activePaletteColors = [...props.activePalette.palette];
    for (let i = 0; i < activePaletteColors.length; i++) {
      activePaletteColors[i] = getLesserColors(activePaletteColors[i]);
    }
    return activePaletteColors;
  };

  return (
    <div className={`current-palette ${props.darkMode ? "dark" : ""}`}>
      <div
        className={`editor-color-blocks-wrapper ${
          props.darkMode ? "dark" : ""
        }`}
      >
        {renderEditorColorBlocks}
        <div
          className={`master-block editor-color-block
          ${props.editor ? "editor-mode" : ""}
          ${props.darkMode ? "dark" : ""} 
          ${props.activePalette.index === -1 ? "inactive" : ""}`}
        >
          <div
            className="greater-color master"
            onClick={() => {
              props.updatePaletteAll(incrementAllUp());
            }}
          >
            +
          </div>
          <div className="current-color master">
            <h2 className="label">ALL</h2>
          </div>
          <div
            className="lesser-color master"
            onClick={() => {
              props.updatePaletteAll(incrementAllDown());
            }}
          >
            -
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    viewport: state.actionReducer.VIEWPORT_HEIGHT,
    activePalette: state.actionReducer.ACTIVE_PALETTE,
    colorMode: state.actionReducer.COLOR_MODE,
    editSetting: state.actionReducer.EDIT_SETTING,
    increment: state.actionReducer.EDIT_INCREMENT
  };
}

const mapDispatchToProps = {
  updatePaletteAll
};

const CurrentPalette = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPalette_);

export default CurrentPalette;

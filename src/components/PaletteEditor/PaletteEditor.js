import React, { useRef } from "react";
import "./PaletteEditor.scss";
import { connect } from "react-redux";
import PaletteTracker from "../PaletteTracker/PaletteTracker";
import CurrentPalette from "./CurrentPalette/CurrentPalette"
import EditorSettings from "./EditorSettings/EditorSettings"

const ColorPicker_ = props => {
  const colorContainer = useRef(null);

  return (
    <div className={`palette-editor-interface ${props.darkMode ? "dark" : ""}`}>
      <div className="palette-components-wrapper">
        <EditorSettings />
        <CurrentPalette editor={true} />
      </div>
      <PaletteTracker editor={true} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE
  };
}

const ColorPicker = connect(mapStateToProps)(ColorPicker_);

export default ColorPicker;

import React, { useRef } from "react";
import CurrentPalette from "../PaletteEditor/CurrentPalette";
import "./ColorPicker.scss";
import "../Controls/Controls.scss";
import { connect } from "react-redux";
import PaletteTracker from "../PaletteTracker/PaletteTracker";

const ColorPicker_ = props => {
  const colorContainer = useRef(null);

  return (
    <div className={`color-picker-components ${props.darkMode ? "dark" : ""}`}>
      <div className="settings-wrapper">
        <Presets />
        <Controls />
      </div>
      <ColorWheel colorsContainer={colorContainer} />
      <CurrentColors paletteRef={colorContainer} />
      <PaletteTracker />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE
  };
}

const ColorPicker = connect(mapStateToProps, )(ColorPicker_);

export default ColorPicker;

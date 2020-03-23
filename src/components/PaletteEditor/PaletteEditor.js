import React, { useRef } from "react";
import ColorWheel from "../ColorWheel/ColorWheel";
import Controls from "../Controls/Controls";
import Presets from "../Presets/Presets";
import CurrentColors from "../CurrentColors/CurrentColors";
import "./ColorPicker.scss";
import "../Controls/Controls.scss";
import { connect } from "react-redux";
import Palettes from "../Palettes/Palettes";

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
      <Palettes />
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

import React, { useRef } from "react";
import ColorWheel from "../ColorWheel/ColorWheel";
import Controls from "../Controls/Controls";
import Palette from "../Palette/Palette";
import "./ColorPicker.scss";
import "../Controls/Controls.scss";
import { connect } from "react-redux";

const ColorPicker_ = props => {
  const colorContainer = useRef(null);

  return (
    <div className={`color-picker-container ${props.darkMode ? "dark" : ""}`}>
        <Controls />
        <ColorWheel colorsContainer={colorContainer} />
        <Palette paletteRef={colorContainer} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    saturation: state.actionReducer.SATURATION,
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    linked: state.actionReducer.LINKED,
    darkMode: state.actionReducer.DARK_MODE
  };
}

const ColorPicker = connect(mapStateToProps)(ColorPicker_);

export default ColorPicker;

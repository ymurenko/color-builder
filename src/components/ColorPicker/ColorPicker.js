import React, { useRef } from "react";
import ColorWheel from "../ColorWheel/ColorWheel";
import Controls from "../Controls/Controls";
import PickerPalette from "../PickerPalette/PickerPalette";
import "./ColorPicker.scss";
import "../Controls/Controls.scss";
import { connect } from "react-redux";
import { setDarkMode } from "../../redux/actions/actions";
import Palettes from "../Palettes/Palettes";

const ColorPicker_ = props => {
  const colorContainer = useRef(null);

  return (
    <div className={`color-picker-container active-tab ${props.darkMode ? "dark" : ""}`}>
      <div className="navbar-container">
        <div
          className={`tab color-picker-tab active-tab ${props.darkMode ? "dark" : ""}`}
        >Colorpicker</div>
        <div
          className={`shadow-tab tab color-picker-tab ${
            props.darkMode ? "dark" : ""
          }`}
        />
         <div
          className={`tab editor-tab ${props.darkMode ? "dark" : ""}`}
        >Palette editor</div>
        <div
          className={`shadow-tab tab editor-tab ${
            props.darkMode ? "dark" : ""
          }`}
        />
        <button
          className={`button set-dark ${props.darkMode ? "dark" : ""}`}
          type="button"
          onClick={() => {
            props.setDarkMode();
          }}
        >
          {props.darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div
        className={`color-picker-components ${props.darkMode ? "dark" : ""}`}
      >
        <Controls />
        <ColorWheel colorsContainer={colorContainer} />
        <PickerPalette paletteRef={colorContainer} />
        <Palettes />
      </div>
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

const mapDispatchToProps = {
  setDarkMode
};

const ColorPicker = connect(mapStateToProps, mapDispatchToProps)(ColorPicker_);

export default ColorPicker;

import React, { useRef } from "react";
import ColorWheel from "../ColorWheel/ColorWheel";
import Controls from "../Controls/Controls";
import Palette from "../Palette/Palette"
import "./ColorPicker.scss";
import copy from "copy-to-clipboard";
import { connect } from "react-redux";
import { store } from "../../redux/reducers/reducers"

const ColorPicker_ = props => {
  const colorContainer = useRef(null);
  const copyAllColors = () => {
    console.log(store.getState())
    copy(store.getState().actionReducer.COLORS);
  };

  return (
    <div className={`color-picker-container ${props.darkMode ? "dark" : ""}`}>
      <ColorWheel colorsContainer={colorContainer} />
      <div className="boxes">
        <Controls />
        <div className={`colors-wrapper ${props.darkMode ? "dark" : ""}`}>
          <Palette paletteRef={colorContainer} />
          <div className="control-container">
            <button
              className={`button ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => { copyAllColors(); }}
            >
              Copy all
            </button>
          </div>
        </div>
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
    darkMode: state.actionReducer.DARK_MODE,
  };
}

const ColorPicker = connect(mapStateToProps)(ColorPicker_);

export default ColorPicker;

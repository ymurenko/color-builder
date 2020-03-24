import React, { useRef } from "react";
import { connect } from "react-redux";
import {
  setColorMode,
  setEditSetting,
  setEditIncrement
} from "../../../redux/actions/actions";
import "../../Slider/Slider.scss";
import "./EditorSettings.scss";

const EditorSettings_ = props => {
  return (
    <div className={`editor-settings ${props.darkMode ? "dark" : ""}`}>
      <div className="controls-left">
        <div className="control-container mode-selector-container">
          <button
            className={`button color-mode ${
              props.editMode === 1 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.editMode != 1) {
                props.setEditSetting(1);
              }
            }}
          >
            Hue
          </button>
          <button
            className={`button color-mode ${
              props.editMode === 2 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.editMode != 2) {
                props.setEditSetting(2);
              }
            }}
          >
            Saturation
          </button>
          <button
            className={`button color-mode ${
              props.editMode === 3 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.editMode != 3) {
                props.setEditSetting(3);
              }
            }}
          >
            Lightness
          </button>
        </div>
      </div>
      <div className="controls-center">
      <div className="slider-container">
          <p className="slider-label short">Increment: {props.editIncrement}</p>
          <input
            type="range"
            className={`slider short${props.darkMode ? "dark" : ""}`}
            min={1}
            max={50}
            step={1}
            value={props.editIncrement}
            onChange={val => {
              props.setEditIncrement(val.target.value);
            }}
          />
        </div>
      </div>
      <div className="controls-right">
        <div className="control-container mode-selector-container">
          <button
            className={`button color-mode ${
              props.colorMode === 1 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.colorMode != 1) {
                props.setColorMode(1);
              }
            }}
          >
            HEX
          </button>
          <button
            className={`button color-mode ${
              props.colorMode === 2 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.colorMode != 2) {
                props.setColorMode(2);
              }
            }}
          >
            RGB
          </button>
          <button
            className={`button color-mode ${
              props.colorMode === 3 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.colorMode != 3) {
                props.setColorMode(3);
              }
            }}
          >
            HSL
          </button>
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
    editMode: state.actionReducer.EDIT_SETTING,
    editIncrement: state.actionReducer.EDIT_INCREMENT
  };
}

const mapDispatchToProps = {
  setColorMode,
  setEditSetting,
  setEditIncrement
};

const EditorSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSettings_);

export default EditorSettings;

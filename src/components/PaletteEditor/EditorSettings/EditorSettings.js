import React from "react";
import { connect } from "react-redux";
import {
  setColorMode,
  setEditSetting,
  setEditIncrement,
  setPrefix,
  setQuotes
} from "../../../redux/actions/actions";
import { copyAllColors } from "../../../util/copy-colors";
import Slider from "../../Slider/Slider";
import "../../Slider/Slider.scss";
import "./EditorSettings.scss";

const EditorSettings_ = props => {
  return (
    <div className={`editor-settings ${props.darkMode ? "dark" : ""}`}>
      <div
        className={`editor-controls increment-settings ${
          props.darkMode ? "dark" : ""
        }`}
      >
        <div className="input-container">
          <button
            className={`button editor-button longest ${
              props.editMode[0] ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              props.setEditSetting(0);
            }}
          >
            Hue
          </button>
          <button
            className={`button editor-button longest ${
              props.editMode[1] ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              props.setEditSetting(1);
            }}
          >
            Saturation
          </button>
          <button
            className={`button editor-button longest ${
              props.editMode[2] ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              props.setEditSetting(2);
            }}
          >
            Lightness
          </button>
          <Slider
            label={"+/- "}
            min={1}
            max={25}
            step={1}
            unit={""}
            extraClass={'short'}
            labelValue={props.editIncrement}
            value={props.editIncrement}
            updateAction={val => props.setEditIncrement(parseInt(val))}
          />
        </div>
      </div>
      <div
        className={`editor-controls color-modes ${
          props.darkMode ? "dark" : ""
        }`}
      >
        <div className="input-container">
          <button
            className={`button editor-button shorter ${
              props.colorMode === 1 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.colorMode !== 1) {
                props.setColorMode(1);
              }
            }}
          >
            HEX
          </button>
          <button
            className={`button editor-button shorter ${
              props.colorMode === 2 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.colorMode !== 2) {
                props.setColorMode(2);
              }
            }}
          >
            RGB
          </button>
          <button
            className={`button editor-button shorter ${
              props.colorMode === 3 ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              if (props.colorMode !== 3) {
                props.setColorMode(3);
              }
            }}
          >
            HSL
          </button>
        </div>
      </div>
      <div
        className={`editor-controls copy-options ${
          props.darkMode ? "dark" : ""
        }`}
      >
        <div className="input-container">
          <button
            className={`button editor-button longer ${
              props.prefix ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              props.setPrefix();
            }}
          >
            {props.colorMode === 1
              ? "#..."
              : props.colorMode === 2
              ? "rgb(...)"
              : "hsl(...)"}
          </button>
          <button
            className={`button editor-button longer ${
              props.quotes ? "active" : ""
            } ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() => {
              props.setQuotes();
            }}
          >
            Quotes
          </button>
          <button
            className={`button editor-button longer ${
              props.darkMode ? "dark" : ""
            }`}
            type="button"
            onClick={() => {
              copyAllColors(
                [...props.activePalette.palette],
                props.colorMode,
                props.quotes,
                props.prefix
              );
            }}
          >
            Copy all
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    prefix: state.actionReducer.PREFIX,
    quotes: state.actionReducer.QUOTES,
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
  setEditIncrement,
  setPrefix,
  setQuotes
};

const EditorSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSettings_);

export default EditorSettings;

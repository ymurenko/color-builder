import React from "react";
import { connect } from "react-redux";
import {
  setLightness,
  setSaturation,
  setSelectorCount,
  resetState,
  setLinkedState,
  setSelectorAngle,
  setSelectorRadius,
  setDarkMode
} from "../../redux/actions/actions";
import "./Controls.scss";

const Controls_ = props => {
  return (
    <div className={`color-picker-controls ${props.darkMode ? "dark" : ""}`}>
      <div className="control-container">
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
      <div className="control-container">
        <p className="control-label">Lightness: {props.lightness}%</p>
        <input
          type="range"
          className="slider"
          min={10}
          max={90}
          step={5}
          value={props.lightness}
          onChange={val => {
            props.setLightness(val.target.value);
          }}
        />
      </div>
      <div className="control-container">
        <p className="control-label">Saturation: {props.saturation}%</p>
        <input
          type="range"
          className="slider"
          min={10}
          max={100}
          step={5}
          value={props.saturation}
          onChange={val => {
            props.setSaturation(val.target.value);
          }}
        />
      </div>
      <div className="control-container">
        <p className="control-label">
          Number of Points: {props.selectorCount}
        </p>
        <input
          type="range"
          className="slider"
          min={1}
          max={10}
          step={1}
          value={props.selectorCount}
          onChange={val => {
            props.setSelectorCount(val.target.value);
          }}
        />
      </div>
      <div className="control-container">
        <p className="control-label">
          Point Spacing Angle:{" "}
          {(
            Math.round((props.selectorAngle / props.selectorCount) * 10) / 10
          ).toFixed(1)}
          º
        </p>
        <input
          type="range"
          className="slider"
          min={10}
          max={360}
          step={1}
          value={props.selectorAngle}
          onChange={val => {
            props.setSelectorAngle(val.target.value);
          }}
        />
      </div>
      <div className="control-container">
        <p className="control-label">
          Distance from Origin:{" "}
          {(
            Math.round((props.selectorRadius / 236) * 1000) / 10
          ).toFixed(0)}
        </p>
        <input
          type="range"
          className="slider"
          min={1}
          max={236}
          step={1}
          value={props.selectorRadius}
          onChange={val => {
            props.setSelectorRadius(val.target.value);
          }}
        />
      </div>
      <div className="control-container" style={{marginTop: '25px'}}>
        <button
          className={`button ${props.linked ? "active" : ""} ${
            props.darkMode ? "dark" : ""
          }`}
          type="button"
          onClick={() => {
            props.setLinkedState();
          }}
        >
          {props.linked ? "Unlink" : "Link"}
        </button>
        <button
          className={`button ${props.darkMode ? "dark" : ""}`}
          type="button"
          onClick={() => {
            props.resetState();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    saturation: state.actionReducer.SATURATION,
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    selectorAngle: state.actionReducer.SELECTOR_ANGLE,
    selectorRadius: state.actionReducer.SELECTOR_RADIUS,
    linked: state.actionReducer.LINKED,
    darkMode: state.actionReducer.DARK_MODE
  };
}

const mapDispatchToProps = {
  setLightness,
  setSaturation,
  setSelectorCount,
  resetState,
  setLinkedState,
  setSelectorAngle,
  setSelectorRadius,
  setDarkMode
};

const Controls = connect(mapStateToProps, mapDispatchToProps)(Controls_);

export default Controls;

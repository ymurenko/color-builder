import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  setLightness,
  setSaturation,
  setSelectorCount,
  resetState,
  setLinkedState,
  setSelectorAngle,
  setSelectorRadius,
  setSelectorStagger,
  setDarkMode,
  setPreset
} from "../../redux/actions/actions";
import "./Controls.scss";
import "./Slider.scss";

const Controls_ = props => {
  const [tab, setTab] = useState(true);
  const staggerSlider = useRef(null);

  useEffect(() => {
    props.setSelectorStagger(staggerSlider.current.value);
  }, [props.selectorRadius]);

  return (
    <div className={`controls ui-block ${props.darkMode ? "dark" : ""}`}>
      <div className="control-container">
        <button
          className={`button ${tab ? "active" : ""} ${
            props.darkMode ? "dark" : "" }`}
          type="button"
          onClick={() => {
            setTab(true);
          }}
        >
          Settings
        </button>
        <button
          className={`button ${tab ? "" : "active"} ${
            props.darkMode ? "dark" : "" }`}
          type="button"
          onClick={() => {
            setTab(false);
          }}
        >
          Presets
        </button>
      </div>
      <div className="presets" style={{ display: tab ? "none" : "" }}>
        <div className="presets-grid">
          <button
            className={`preset button ${props.darkMode ? "dark" : ""} ${props.preset === 'default' ? "active" : ""} `}
            type="button"
            onClick={() => {
              props.setPreset('default');
            }}
          >
            Analogous
          </button>
          <button
            className={`preset button  ${props.darkMode ? "dark" : ""} ${props.preset === 'triad' ? "active" : ""}`}
            type="button"
            onClick={() => {
              props.setPreset('triad');
            }}
          >
            Triad
          </button>
          <button
            className={`preset button  ${props.darkMode ? "dark" : ""} ${props.preset === 'tetrad' ? "active" : ""}`}
            type="button"
            onClick={() => {
              props.setPreset('tetrad');
            }}
          >
            Tetrad
          </button>
        </div>
      </div>
      <div className="settings" style={{ display: tab ? "" : "none" }}>
        <div className="control-container">
          <p className="slider-label">Lightness: {props.lightness}%</p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={10}
            max={90}
            step={5}
            value={props.lightness}
            onChange={val => {
              props.setLightness(val.target.value);
            }}
          />
        </div>
        <div className="control-container slider-container">
          <p className="slider-label">Saturation: {props.saturation}%</p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={10}
            max={100}
            step={5}
            value={props.saturation}
            onChange={val => {
              props.setSaturation(val.target.value);
            }}
          />
        </div>
        <div className="control-container slider-container">
          <p className="slider-label">
            Number of Points: {props.selectorCount}
          </p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={1}
            max={10}
            step={1}
            value={props.selectorCount}
            onChange={val => {
              props.setSelectorCount(val.target.value);
            }}
          />
        </div>
        <div className="control-container slider-container">
          <p className="slider-label">
            Point Spacing Angle:{" "}
            {(
              Math.round((props.selectorAngle / props.selectorCount) * 10) / 10
            ).toFixed(1)}
            º
          </p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={10}
            max={360}
            step={1}
            value={props.selectorAngle}
            onChange={val => {
              props.setSelectorAngle(val.target.value);
            }}
          />
        </div>
        <div className="control-container slider-container">
          <p className="slider-label">
            Distance from Origin:{" "}
            {(Math.round((props.selectorRadius / 236) * 1000) / 10).toFixed(0)}
          </p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={1}
            max={236}
            step={1}
            value={props.selectorRadius}
            onChange={val => {
              props.setSelectorRadius(val.target.value);
            }}
          />
        </div>
        <div className="control-container">
          <p className="slider-label">
            Distance Stagger:{" "}
            {(Math.round(props.selectorStagger * 10) / 10).toFixed(0)}
          </p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            ref={staggerSlider}
            min={-(236 - props.selectorRadius)}
            max={props.selectorRadius}
            step={1}
            defaultValue={props.selectorStagger}
            onChange={val => {
              console.log("sdfds");
              props.setSelectorStagger(val.target.value);
            }}
          />
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
    selectorAngle: state.actionReducer.SELECTOR_ANGLE,
    selectorRadius: state.actionReducer.SELECTOR_RADIUS,
    selectorStagger: state.actionReducer.SELECTOR_STAGGER,
    linked: state.actionReducer.LINKED,
    darkMode: state.actionReducer.DARK_MODE,
    preset: state.actionReducer.PRESET
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
  setSelectorStagger,
  setDarkMode,
  setPreset
};

const Controls = connect(mapStateToProps, mapDispatchToProps)(Controls_);

export default Controls;

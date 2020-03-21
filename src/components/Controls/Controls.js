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
  setClusterAngle,
  setPreset
} from "../../redux/actions/actions";
import "./Controls.scss";
import "./Slider.scss";

const Controls_ = props => {
  const [tab, setTab] = useState(true);
  const staggerSlider = useRef(null);
  const selectorCountSlider = useRef(null);

  useEffect(() => {
    props.setSelectorStagger(staggerSlider.current.value);
  }, [props.selectorRadius]);

  useEffect(() => {
    if(props.preset != 1) {
      props.setSelectorCount(props.preset*3);
    }
  }, [props.preset]);

  return (
    <div className={`controls ui-block ${props.darkMode ? "dark" : ""}`}>
      <div className="control-container">
        <button
          className={`button ${tab ? "active" : ""} ${
            props.darkMode ? "dark" : ""
          }`}
          type="button"
          onClick={() => {
            setTab(true);
          }}
        >
          Settings
        </button>
        <button
          className={`button ${tab ? "" : "active"} ${
            props.darkMode ? "dark" : ""
          }`}
          type="button"
          onClick={() => {
            setTab(false);
          }}
        >
          Presets
        </button>
      </div>
      <div className="presets" style={{ display: tab ? "none" : "" }}>
        <div>
        <div className="presets-grid">
          <button
            className={`preset dyad ${props.darkMode ? "dark" : ""} ${
              props.preset === 2 ? "active" : ""
            } `}
            type="button"
            onClick={() => {
              if (!(props.preset === 2)) props.setPreset(2);
            }}
          />
          <button
            className={`preset triad  ${props.darkMode ? "dark" : ""} ${
              props.preset === 3 ? "active" : ""
            }`}
            type="button"
            onClick={() => {
              if (!(props.preset === 3)) props.setPreset(3);
            }}
          />
          <button
            className={`preset tetrad  ${props.darkMode ? "dark" : ""} ${
              props.preset === 4 ? "active" : ""
            }`}
            type="button"
            onClick={() => {
              if (!(props.preset === 4)) props.setPreset(4);
            }}
          />
          <button
            className={`preset pentad  ${props.darkMode ? "dark" : ""} ${
              props.preset === 5 ? "active" : ""
            }`}
            type="button"
            onClick={() => {
              if (!(props.preset === 5)) props.setPreset(5);
            }}
          />
          
        </div>
        </div>
        <div className="control-container slider-container" style={{marginTop: '80px'}}>
          <p className="slider-label">Cluster Spacing Angle:{" "}
            {(
              Math.round((props.clusterAngle) * 10) / 10
            ).toFixed(1)}
            º</p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={1}
            max={((props.selectorAngle / props.preset)/props.selectorCount)*props.preset}
            step={1}
            value={props.clusterAngle}
            onChange={val => {
              props.setClusterAngle(val.target.value);
            }}
          />
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
            ref={selectorCountSlider}
            min={props.preset}
            max={15}
            step={props.preset}
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
            Distance From Origin:{" "}
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
    preset: state.actionReducer.PRESET,
    clusterAngle: state.actionReducer.CLUSTER_ANGLE
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
  setClusterAngle,
  setPreset
};

const Controls = connect(mapStateToProps, mapDispatchToProps)(Controls_);

export default Controls;

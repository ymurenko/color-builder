import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  setSelectorCount,
  setDarkMode,
  setClusterAngle,
  setPreset
} from "../../redux/actions/actions";
import "./Presets.scss";
import "../Slider/Slider.scss";

const Presets_ = props => {

  useEffect(() => {
    if (props.preset != 1) {
      props.setSelectorCount(props.preset * 3);
    }
  }, [props.preset]);

  return (
    <div className={`presets ui-half-block ${props.darkMode ? "dark" : ""}`}>
      <div className="presets-wrapper">
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
      <div
        className="slider-container"
        style={{ marginTop: `${props.Viewport * 0.1}` }}
      >
        <p className="slider-label">
          Cluster Spacing Angle:{" "}
          {(Math.round(props.clusterAngle * 10) / 10).toFixed(1)}º
        </p>
        <input
          type="range"
          className={`slider ${props.darkMode ? "dark" : ""}`}
          min={1}
          max={
            (props.selectorAngle / props.preset / props.selectorCount) *
            props.preset
          }
          step={1}
          value={props.clusterAngle}
          onChange={val => {
            props.setClusterAngle(val.target.value);
          }}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    selectorAngle: state.actionReducer.SELECTOR_ANGLE,
    selectorRadius: state.actionReducer.SELECTOR_RADIUS,
    darkMode: state.actionReducer.DARK_MODE,
    preset: state.actionReducer.PRESET,
    clusterAngle: state.actionReducer.CLUSTER_ANGLE,
    Viewport: state.actionReducer.VIEWPORT_HEIGHT
  };
}

const mapDispatchToProps = {
  setSelectorCount,
  setDarkMode,
  setClusterAngle,
  setPreset
};

const Presets = connect(mapStateToProps, mapDispatchToProps)(Presets_);

export default Presets;

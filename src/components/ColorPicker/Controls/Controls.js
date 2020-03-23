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
  setDarkMode
} from "../../../redux/actions/actions";
import "./Controls.scss";
import "../../Slider/Slider.scss";

const Controls_ = props => {
  const staggerSlider = useRef(null);
  const radiusSlider = useRef(null);

  useEffect(() => {
    props.setSelectorStagger(staggerSlider.current.value);
  }, [props.selectorRadius]);

  useEffect(() => {
    props.setSelectorRadius(radiusSlider.current.value);
  }, [props.selectorAngle]);

  return (
    <div className={`controls ui-half-block ${props.darkMode ? "dark" : ""}`}>
      <div className="controls-wrapper">
        <div className="slider-container">
          <p className="slider-label">Lightness: {props.lightness}%</p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={10}
            max={90}
            step={1}
            value={props.lightness}
            onChange={val => {
              props.setLightness(val.target.value);
            }}
          />
        </div>
        <div className="slider-container">
          <p className="slider-label">Saturation: {props.saturation}%</p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={10}
            max={100}
            step={1}
            value={props.saturation}
            onChange={val => {
              props.setSaturation(val.target.value);
            }}
          />
        </div>
        <div className="slider-container">
          <p className="slider-label">
            Number of Points: {props.selectorCount}
          </p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            min={props.preset}
            max={15}
            step={props.preset}
            value={props.selectorCount}
            onChange={val => {
              props.setSelectorCount(val.target.value);
            }}
          />
        </div>
        <div className="slider-container">
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
        <div className="slider-container">
          <p className="slider-label">
            Distance From Origin:{" "}
            {(Math.round((props.selectorLinkedRadius / (props.viewport * 0.325)) * 1000) / 10).toFixed(0)}
          </p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            ref={radiusSlider}
            min={1}
            max={0.325 * props.viewport}
            step={1}
            value={props.selectorLinkedRadius}
            onChange={val => {
              props.setSelectorRadius(val.target.value);
            }}
          />
        </div>
        <div className="slider-container">
          <p className="slider-label">
            Distance Stagger:{" "}
            {(Math.round(props.selectorStagger * 10) / 10).toFixed(0)}
          </p>
          <input
            type="range"
            className={`slider ${props.darkMode ? "dark" : ""}`}
            ref={staggerSlider}
            min={-(0.315 * props.viewport - props.selectorRadius)}
            max={props.selectorRadius}
            step={1}
            value={props.selectorStagger}
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
    selectorLinkedRadius: state.actionReducer.SELECTOR_LINKED_RADIUS,
    selectorStagger: state.actionReducer.SELECTOR_STAGGER,
    darkMode: state.actionReducer.DARK_MODE,
    preset: state.actionReducer.PRESET,
    viewport: state.actionReducer.VIEWPORT_HEIGHT
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
  setDarkMode
};

const Controls = connect(mapStateToProps, mapDispatchToProps)(Controls_);

export default Controls;

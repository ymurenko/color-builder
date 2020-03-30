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
import Slider from "../../Slider/Slider";
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
      <Slider
          label={"Number of Colors: "}
          min={props.preset}
          max={15}
          step={props.preset}
          unit={""}
          labelValue={props.selectorCount}
          value={props.selectorCount}
          updateAction={val => props.setSelectorCount(parseInt(val))}
        />
        <Slider
          label={"Saturation: "}
          min={10}
          max={100}
          step={1}
          unit={"%"}
          labelValue={props.saturation}
          value={props.saturation}
          updateAction={val => props.setSaturation(parseInt(val))}
        />
        <Slider
          label={"Lightness: "}
          min={10}
          max={90}
          step={1}
          unit={"%"}
          labelValue={props.lightness}
          value={props.lightness}
          updateAction={val => props.setLightness(parseInt(val))}
        />
        <Slider
          label={"Hue Offset: "}
          min={10}
          max={360}
          step={1}
          unit={"º"}
          labelValue={(
            Math.round((props.selectorAngle / props.selectorCount) * 10) / 10
          ).toFixed(1)}
          value={props.selectorAngle}
          updateAction={val => props.setSelectorAngle(parseInt(val))}
        />
        <Slider
          label={"Distance: "}
          refProp={radiusSlider}
          min={1}
          max={0.325 * props.viewport}
          step={1}
          unit={"%"}
          labelValue={(
            Math.round(
              (props.selectorLinkedRadius / (props.viewport * 0.325)) * 1000
            ) / 10
          ).toFixed(0)}
          value={props.selectorLinkedRadius}
          updateAction={val => props.setSelectorRadius(parseInt(val))}
        />
        <Slider
          label={"Stagger: "}
          refProp={staggerSlider}
          min={-(0.315 * props.viewport - props.selectorRadius)}
          max={props.selectorRadius}
          step={1}
          unit={""}
          labelValue={(Math.round(props.selectorStagger * 10) / 10).toFixed(0)}
          value={props.selectorStagger}
          updateAction={val => props.setSelectorStagger(parseInt(val))}
        />
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

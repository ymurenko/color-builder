import React, { useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { resetState, setLinkedState } from "../../redux/actions/actions";
import Selectors from "../Selectors/Selectors";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";

import "./ColorWheel.scss";

const ColorWheel_ = props => {
  const canvas = useRef(null);

  const generateGradient = () => {
    let canvasContext = canvas.current.getContext("2d");
    canvasContext.clearRect(0, 0, 500, 500);
    for (var i = 0; i < 3600; i += 1) {
      let value = i / 10;
      canvasContext.beginPath();
      let gradient = canvasContext.createLinearGradient(
        250,
        250,
        xLUT.default[value],
        yLUT.default[value]
      );

      gradient.addColorStop("0", `${props.lightness > 45 ? "white" : "black"}`);
      gradient.addColorStop(
        "0.95",
        `hsl(${value}, ${props.saturation}%, ${props.lightness}%)`
      );
      gradient.addColorStop(
        "0.95",
        `${props.darkMode ? "#212121" : "#b5b5b5"}`
      );
      gradient.addColorStop("1", `${props.darkMode ? "#212121" : "#b5b5b5"}`);

      canvasContext.strokeStyle = gradient;

      canvasContext.moveTo(250, 250);
      canvasContext.lineTo(xLUT.default[value], yLUT.default[value]);
      canvasContext.stroke();
    }
  };

  useLayoutEffect(() => {
    generateGradient();
  });

  return (
    <div className={`container-block ${props.darkMode ? "dark" : ""}`}>
      <button
        className={`button button-left ${props.linked ? "active" : ""} ${
          props.darkMode ? "dark" : ""
        }`}
        type="button"
        onClick={() => {
          props.setLinkedState();
        }}
      >
        {props.linked ? "Unlink" : "Link"}
      </button>
      <div className="gradient" >
        <Selectors colorsContainer={props.colorsContainer} canvas={canvas} />
        <canvas width={"500"} height={"500"} ref={canvas} />
      </div>

      <button
        className={`button button-right ${props.darkMode ? "dark" : ""}`}
        type="button"
        onClick={() => {
          props.resetState();
        }}
      >
        Reset
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    saturation: state.actionReducer.SATURATION,
    darkMode: state.actionReducer.DARK_MODE,
    linked: state.actionReducer.LINKED
  };
}

const mapDispatchToProps = {
  resetState,
  setLinkedState
};

const ColorWheel = connect(mapStateToProps, mapDispatchToProps)(ColorWheel_);

export default ColorWheel;

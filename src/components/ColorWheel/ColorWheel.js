import React, { useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { resetState, setLinkedState } from "../../redux/actions/actions";
import Selectors from "../Selectors/Selectors";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";
import {colorWheelRadius} from "../../constants/constants"
import "./ColorWheel.scss";

const ColorWheel_ = props => {
  const canvas = useRef(null);

  const generateGradient = () => {
    let canvasContext = canvas.current.getContext("2d");
    canvasContext.clearRect(0, 0, colorWheelRadius*2, colorWheelRadius*2);
    for (var i = 0; i < 3600; i += 1) {
      let value = i / 10;
       let rad = ((value - 90) * Math.PI) / 180;
       let x = colorWheelRadius + colorWheelRadius * Math.cos(-rad)
       let y = colorWheelRadius + colorWheelRadius * Math.sin(-rad)
      canvasContext.beginPath();
      let gradient = canvasContext.createLinearGradient(
        colorWheelRadius,
        colorWheelRadius,
        x, y
        /*xLUT.default[value],
        yLUT.default[value]*/
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

      canvasContext.moveTo(colorWheelRadius, colorWheelRadius);
      canvasContext.lineTo(x, y);
      canvasContext.stroke();
    }
  };

  useLayoutEffect(() => {
    generateGradient();
  });

  return (
    <div className={`container-block ${props.darkMode ? "dark" : ""}`} style={{height: `${colorWheelRadius*2}`, width: `${colorWheelRadius*2}`}}>
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
        <canvas width={`${colorWheelRadius*2}`} height={`${colorWheelRadius*2}`} ref={canvas} />
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

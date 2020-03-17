import React, {useLayoutEffect, useRef } from "react";
import { connect } from 'react-redux';
import Selectors from "../Selectors/Selectors";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";

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
      gradient.addColorStop("0.95", `hsl(${value}, ${props.saturation}%, ${props.lightness}%)`);
      gradient.addColorStop("0.95", `${ props.darkMode ? '#262626': '#bdbdbd'}`);
      gradient.addColorStop("1", `${ props.darkMode ? '#333333': '#e3e3e3'}`);
   
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
    <div className="gradient">
        <Selectors
          colorsContainer={props.colorsContainer}
          canvas={canvas}
        />
      <canvas width={"500"} height={"500"} ref={canvas} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    saturation: state.actionReducer.SATURATION,
    darkMode: state.actionReducer.DARK_MODE
  };
}

const ColorWheel = connect(mapStateToProps)(ColorWheel_);

export default ColorWheel;


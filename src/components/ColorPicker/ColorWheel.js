import React, { useMemo, useLayoutEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import Selectors from "./Selectors";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";

const ColorWheel_ = props => {
  const [linkState, setLinkState] = useState(0);
  let dark = useMemo(() => props.isDarkMode)
  let reset = useMemo(() => props.reset)

  const canvas = useRef(null);
  const svg = useRef(null);

  const generateGradient = () => {
    let canvasContext = canvas.current.getContext("2d");
    canvasContext.clearRect(0, 0, 500, 500);
    for (var i = 0; i < 3600; i += 1) {
      let value = i / 10;
      let gradient = canvasContext.createLinearGradient(
        250,
        250,
        xLUT.default[value],
        yLUT.default[value]
      );

      gradient.addColorStop("0", `${props.lightness > 45 ? "white" : "black"}`);
      gradient.addColorStop("0.95", `hsl(${value}, ${props.saturation}%, ${props.lightness}%)`);
      gradient.addColorStop("0.95", `${ dark ? '#262626': '#bdbdbd'}`);
      gradient.addColorStop("1", `${ dark ? '#333333': '#e3e3e3'}`);
   
      canvasContext.strokeStyle = gradient;
      canvasContext.beginPath();
      canvasContext.moveTo(250, 250);
      canvasContext.lineTo(xLUT.default[value], yLUT.default[value]);
      canvasContext.stroke();
    }
  };

  useLayoutEffect(() => {
    generateGradient();
  },[props.lightness, props.saturation]);

  useLayoutEffect(() => {
    generateGradient();
  },[props.reset]);

  return (
    <div className="gradient">
        <Selectors
          colorsContainer={props.colorsContainer}
          isLinked={props.isLinked}
          canvas={canvas}
          reset={reset}
        />
      <canvas width={"500"} height={"500"} ref={canvas} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    saturation: state.actionReducer.SATURATION,
  };
}

const ColorWheel = connect(mapStateToProps)(ColorWheel_);

export default ColorWheel;


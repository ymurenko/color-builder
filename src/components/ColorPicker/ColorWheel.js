import React, { useMemo, useLayoutEffect, useRef, useState } from "react";
import Selectors from "./Selectors";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";
import * as cosLUT from "./cosLUT.json";
import * as sinLUT from "./sinLUT.json";

const ColorWheel = props => {
  const [linkState, setLinkState] = useState(0);
  let dark = useMemo(() => props.isDarkMode)
  let reset = useMemo(() => props.reset)

  const canvas = useRef(null);
  const svg = useRef(null);

  const generateGradient = (S = 100, L = 50) => {
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

      gradient.addColorStop("0", `${L > 45 ? "white" : "black"}`);
      gradient.addColorStop("0.95", `hsl(${value}, ${S}%, ${L}%)`);
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
    generateGradient(props.saturation, props.lightness);
  });

  useLayoutEffect(() => {
    generateGradient();
  },[props.reset]);

  return (
    <div className="gradient">
        <Selectors
          colorsContainer={props.colorsContainer}
          isLinked={props.isLinked}
          selectorCount={props.selectors}
          canvas={canvas}
          lightness={props.lightness}
          reset={reset}
        />

      <canvas width={"500"} height={"500"} ref={canvas} />
    </div>
  );
};

export default ColorWheel;

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Selectors from "./Selectors";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";
import * as cosLUT from "./cosLUT.json";
import * as sinLUT from "./sinLUT.json";

const ColorWheel = props => {
  const [linkState, setLinkState] = useState(0);
  let selectorCount = props.selectors;

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
      gradient.addColorStop("0.95", `hsl(${value}, 100%, ${props.lightness}%)`);
      gradient.addColorStop("0.95", `white`);
      gradient.addColorStop("1", `white`);

      canvasContext.strokeStyle = gradient;
      canvasContext.beginPath();
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
          isLinked={props.isLinked}
          selectorCount={selectorCount}
          canvas={canvas}
        />

      <canvas width={"500"} height={"500"} ref={canvas} />
    </div>
  );
};

export default ColorWheel;

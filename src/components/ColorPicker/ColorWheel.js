import React, { useLayoutEffect, useRef, useState } from "react";
import Selector from "./Selector";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";
import * as cosLUT from "./cosLUT.json";
import * as sinLUT from "./sinLUT.json";

const ColorWheel = props => {
  let selectorCount = props.selectors;

  const canvas = useRef(null);
  const svg = useRef(null);
  const selectorRefs = useRef([]);

  const createSelector = () => {
    let selectors = [];
    let degreeOffset = 0;
    let degreeIncrement = Math.round(360 / selectorCount) * (Math.PI / 180);
    if (props.isLinked) {
      for (let i = 0; i < selectorCount; i++) {
        let x = 250 + 200 * Math.cos(degreeOffset);
        let y = 250 + 200 * Math.sin(degreeOffset);
        let pixel = canvas.current.getContext("2d").getImageData(x, y, 1, 1).data;
        let pixelColor =
          "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
        selectors.push(
          <circle
            cx={x}
            cy={y}
            r="10"
            stroke="#fff"
            stroke-width="3"
            style={{ filter: "drop-shadow(0 0 4px #4d4d4d)", fill:pixelColor }}
            onMouseDown={() => handleMouseDown()}
            onMouseUp={() => handleMouseUp()}
          />
        );
        degreeOffset += degreeIncrement;
      }
    } else {
      for (let i = 0; i < selectorCount; i++) {
        selectors.push(
          <Selector
            canvasRef={canvas}
            svgRef={svg}
            isLinked={props.isLinked}
            initialPoint={[
              250 + 200 * Math.cos(degreeOffset),
              250 + 200 * Math.sin(degreeOffset)
            ]}
          />
        );
        degreeOffset += degreeIncrement;
      }
    }
    return selectors;
  };

  const handleMouseDown = () => {
    if (props.isLinked) {
      svg.current.addEventListener("mousemove", addMouseTracker);
    }
  };

  const handleMouseUp = () => {
    if (props.isLinked) {
      svg.current.removeEventListener("mousemove", addMouseTracker);
    }
  };

  const addMouseTracker = event => {
    let cx = event.clientX - canvas.current.offsetLeft;
    let cy = event.clientY - canvas.current.offsetTop;

    let x1 = svg.current.children[0].getAttribute("cx");
    let y1 = svg.current.children[0].getAttribute("cy");

    let degreeIncrement = (360 / selectorCount) * (Math.PI / 180);
    let degreeOffset = degreeIncrement;
    let pixel = canvas.current.getContext("2d").getImageData(x1, y1, 1, 1).data;
    let pixelColor =
      "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
    svg.current.children[0].style.fill = pixelColor;
    svg.current.children[0].setAttribute("cx", `${cx}`);
    svg.current.children[0].setAttribute("cy", `${cy}`);

    for (let i = 1; i < selectorCount; i++) {
      let x0 = svg.current.children[0].getAttribute("cx");
      let y0 = svg.current.children[0].getAttribute("cy");
      let x2 = svg.current.children[i].getAttribute("cx");
      let y2 = svg.current.children[i].getAttribute("cy");

      pixel = canvas.current.getContext("2d").getImageData(x2, y2, 1, 1).data;
      let pixelColor =
        "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
      svg.current.children[i].style.fill = pixelColor;

      let d0x = x0 - 250;
      let d0y = y0 - 250;
      let d2x = x2 - 250;
      let d2y = y2 - 250;

      let angle1 = Math.atan2(d0y, d0x);
      //let angle2 = Math.atan2(d2y, d2x);
      let angle = degreeOffset + angle1;

      let radius = Math.abs(
        Math.sqrt((250 - cx) * (250 - cx) + (250 - cy) * (250 - cy))
      );

      svg.current.children[i].setAttribute(
        "cx",
        `${250 + radius * Math.cos(angle)}`
      );
      svg.current.children[i].setAttribute(
        "cy",
        `${250 + radius * Math.sin(angle)}`
      );
      degreeOffset += degreeIncrement;
    }
  };

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
      <svg
        className="selector"
        ref={svg}
        width="500"
        height="500"
        viewBox="0 0 500 500"
      >
        {createSelector()}
      </svg>
      <canvas width={"500"} height={"500"} ref={canvas} />
    </div>
  );
};

export default ColorWheel;

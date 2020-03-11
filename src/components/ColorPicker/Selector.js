import React, { useEffect, useRef, useState } from "react";

const Selector = props => {
  const circle = useRef(null);
  const [attributes, setAttributes] = useState({
    x: "250px",
    y: "250px",
    color: "#fff"
  });

  const addMouseTracker = event => {
    let x = event.clientX - props.canvasRef.current.offsetLeft;
    let y = event.clientY - props.canvasRef.current.offsetTop;
    let pixel = props.canvasRef.current
      .getContext("2d")
      .getImageData(x, y, 1, 1).data;
    let pixelColor =
      "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
    circle.current.style.fill = pixelColor;
    circle.current.setAttribute("cx", `${x}`);
    circle.current.setAttribute("cy", `${y}`);
  };

  const handleMouseUp = () => {
    if (!props.isLinked) {
      props.svgRef.current.removeEventListener("mousemove", addMouseTracker);
    }
  };

  const handleMouseDown = () => {
    if (!props.isLinked) {
      props.svgRef.current.addEventListener("mousemove", addMouseTracker);
    }
  };

  useEffect(() => {
    let x = circle.current.getAttribute("cx");
    let y = circle.current.getAttribute("cy");
    let pixel = props.canvasRef.current
      .getContext("2d")
      .getImageData(x, y, 1, 1).data;
    let pixelColor =
      "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
    circle.current.style.fill = pixelColor;
  });

  return (
    <circle
      cx={props.initialPoint[0]}
      cy={props.initialPoint[1]}
      r="10"
      ref={circle}
      stroke="#fff"
      stroke-width="3"
      style={{ filter: "drop-shadow(0 0 4px #4d4d4d)" }}
      onMouseDown={() => handleMouseDown()}
      onMouseUp={() => handleMouseUp()}
    />
  );
};

export default Selector;
